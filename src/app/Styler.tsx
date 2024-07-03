import { AppWrapperProvider } from '@/context';
import React, { useEffect, useState } from 'react';
import FontSize from './Fonts/FontSize';
import Color from './Fonts/Color';
import FontFamily from './Fonts/FontFamily';
import TextDecoration from './Fonts/TextDecoration';
import BgColor from './Dimension/BGColor';
import BackgroundImage from './Dimension/BackgroundImage';
import Height from './Dimension/Height';
import Opacity from './Dimension/Opacity';
import Padding from './Dimension/Padding';
import Width from './Dimension/Width';
import BorderColor from './Border/BorderColor';
import BorderRadius from './Border/BorderRadius';
import AnimatedBorder from './Border/AnimatedBorder';
import BorderStyle from './Border/BorderStyle';
import BorderType from './Border/BorderType';
import BorderWidth from './Border/BorderWidth';
import Animation from './Animations/Animation';
import BackgroundAttachment from './Dimension/BackgroundAttachment';
import BackgroundPosition from './Dimension/BackgroundPosition';
import BackgroundSize from './Dimension/BackgroundSize';
import FontWeight from './Fonts/fontWeight';
const Styler = ({ uploadVideo }: { uploadVideo?: (file: File | null, setProgress: (num: number) => void) => Promise<string> }) => {
    const context = AppWrapperProvider();
    const [isImage, setIsImage] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [progress, setProgress] = useState(0);

    if (!context) throw new Error('No context provided');

    const { state, setImages } = context;

    const isMediaComponent = () => {
        if (state) {
            const element = document.getElementById(state);
            if (element) {
                if (element.getElementsByTagName("img")[0]) {
                    setIsImage(true);
                    setIsVideo(false);
                    return;
                }
                if (element.getElementsByTagName("video")[0]) {
                    setIsImage(false);
                    setIsVideo(true);
                    return;
                }
            }
        }
        setIsImage(false);
        setIsVideo(false);
    };

    useEffect(() => {
        isMediaComponent();
    }, [context.state]);

    const onchangeImage = (e: any, id: string) => {
        const elem = document.getElementById(id);
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    console.log(`File loaded for id ${id}`);
                    if (!setImages) return;
                    setImages((prevImages) => ({
                        ...prevImages,
                        [id]: reader.result as string,
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const onchangeVideo = (e: any, id: string) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file && uploadVideo) {
            uploadVideo(file, setProgress)
                .then((url: string) => {
                    console.log(`Video uploaded for id ${id}: ${url}`);
                    const videoElement = document.getElementById(id)?.getElementsByTagName('video')[0];
                    if (videoElement) {
                        videoElement.src = url;
                    }
                })
                .catch((error: any) => {
                    console.error(`Error uploading video for id ${id}: ${error}`);
                });
        }
    };

    return (
        <div id='Styling'>
            <div className='w-[100%]'>
                {isImage && (
                    <input type='file' name='image' onChange={(e) => onchangeImage(e, state as string)} />
                )}
                {isVideo && (
                    <input type='file' name='video' onChange={(e) => onchangeVideo(e, state as string)} />
                )}
                {!isImage && !isVideo && (
                    <>
                        <FontSize />
                        <FontWeight />
                        <Color />
                        <FontFamily />
                        <TextDecoration />
                    </>
                )}
                <br /><br />
                <BgColor />
                <BackgroundImage />
                <Height />
                <Opacity />
                <Padding />
                <Width />
                <BackgroundAttachment />
                <BackgroundPosition />
                <BackgroundSize />
                <br /><br />
                <BorderColor />
                <BorderRadius />
                <AnimatedBorder />
                <BorderStyle />
                <BorderType />
                <BorderWidth />
                <br /><br />
                <Animation />
            </div>
        </div>
    );
};

export default Styler;
