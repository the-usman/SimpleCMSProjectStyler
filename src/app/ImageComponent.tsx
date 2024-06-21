import React, { useContext, useState } from 'react';
import { element } from './types';
import { AppContext } from '@/context/indext';
import DraggableResizableComponent from './DragResizerWarpper';
import { connect } from 'tls';

const ImageComponent = ({ canvasRef }: { canvasRef: React.RefObject<HTMLDivElement> }) => {
    const context = useContext(AppContext);
    const headings = context?.elements?.filter((elem) => elem.type === "image")[0]?.elements;


    const [images, setImages] = useState<{ [key: string]: string }>({});

    const handleImageClick = (id: string) => {
        console.log(`Image with id ${id} clicked`);
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.result) {
                        console.log(`File loaded for id ${id}`);
                        setImages((prevImages) => ({
                            ...prevImages,
                            [id]: reader.result as string
                        }));
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const onClick = (id: string) => {
        if (context?.setState) {
            context?.setState(id);
            console.log(context);
        }
        
    }

    return (
        <div>
            {headings?.map((heading: element) => (
                <DraggableResizableComponent key={heading.id} id={heading.id as string} conRef={canvasRef} onClick={() => onClick(heading.id as string)}>
                    <img
                        src={images[heading.id as string] || 'https://img.icons8.com/?size=100&id=68826&format=png&color=000000'}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: '10px',
                            msUserSelect: 'none',
                            opacity: 1,
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer',  
                        
                            zIndex: 10000000000
                        }}
                        alt='Image'
                        onClick={() => handleImageClick(heading.id as string)}
                        className='select-none'
                    />
                </DraggableResizableComponent>
            ))}
        </div>
    );
}

export default ImageComponent;
