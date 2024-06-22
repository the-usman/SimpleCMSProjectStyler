import React, { useEffect, useRef, useState, } from 'react';
import { Elemento, element } from './types';
import { AppWrapperProvider } from '@/context/indext';
import Icon from './Icon';
import FontSize from './Fonts/FontSize';
import FontWeight from './Fonts/fontWeight';
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


const Panel = () => {
    const context = AppWrapperProvider();
    if (!context) {
        throw new Error('AppContext must be used within an AppProvider');
    }
    type Arg = {
        type: string;
        text?: string;
    }

    const { setElements, elements, state } = context;
    const updateElements = ({ type, text }: Arg): void => {
        if (setElements && elements) {
            let flag = true;
            console.log("state", state);
            setElements((prevElements: Elemento[]): Elemento[] => {
                console.log("Heelo");

                if (!flag) {
                    return prevElements;
                }
                flag = !flag;

                const newElements = [...prevElements];
                const index = newElements.findIndex(element => element.type === type);
                // return newElements;
                if (index === -1) {
                    newElements.push({ type: type, elements: [{ id: `${newElements.length}_0`, text: text || "Enter Text" }] });
                    console.log(newElements);
                    return newElements;
                }



                const elem = newElements[index].elements || [];
                elem.push({ id: `${index}_${elem.length}`, text: text || "Enter Text" });
                newElements[index].elements = elem;

                return newElements;
            });
            return;
        }
        return;
    };
    const handle = (type: string) => {
        updateElements({ type: type });
    }

    const tabs = ['Components', 'Styling'];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    useEffect(() => {
        tabs.forEach(element => {
            const box = document.getElementById(element);
            if (!box) return;
            if (element !== activeTab) {
                box.style.display = 'none';
            }
            else {
                box.style.display = 'flex';
            }
        });

    }, [activeTab]);

    const stylerTypes = [{
        text: ['width', 'height', 'color', 'bg-color', 'padding', 'border*', 'font*'],
        heading: []
    }]


    return (
        <div className='w-[30%]'>
            <div className="siderbar bg-slate-300 w-[100%] h-[100vh] flex flex-col justify-between overflow-auto">

                <div className="tabs flex">

                    {tabs.map(tab => <div className={`w-[50%] p-4 hover:bg-white transition-all duration-500 cursor-pointer rounded-full ${activeTab === tab && 'bg-white'}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </div>)
                    }

                </div>

                <div className='text-center text-3xl font-bold my-20'>Welcome to {activeTab}</div>
                <div className="icons flex justify-evenly items-center gap-2 p-2 flex-wrap" id='Components'>
                    <Icon text='Heading' src='/heading.png' onClick={() => handle('heading')} ></Icon>
                    <Icon text='text' src='/text.png' onClick={() => handle('text')} ></Icon>
                    <Icon text='Image' src='/image.png' onClick={() => handle('image')} ></Icon>
                    <Icon text='Videos' src='/video.png' onClick={() => handle('video')} ></Icon>
                </div>
                <div id="Styling" className='w-[100%]' >
                    <div className='w-[100%]' >
                        <div className='w-[100%]' >
                            <FontSize />
                            <FontWeight />
                            <Color />
                            <FontFamily />
                            <TextDecoration />
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
                </div>

            </div>
        </div>
    )
}

export default Panel
