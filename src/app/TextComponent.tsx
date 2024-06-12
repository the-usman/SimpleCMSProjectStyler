import React, { useState, useRef, useEffect, useContext, FC } from 'react';
import { motion } from 'framer-motion';
import { element } from './types';
import { AppContext } from '@/context/indext';



const TextComponent = ({ canvasRef }: {canvasRef: React.RefObject<HTMLDivElement>}) => {
    const [isResizing, setIsResizing] = useState(false);
    const resizingRef = useRef<HTMLDivElement | null>(null);
    const context = useContext(AppContext);
    const headings = context?.elements?.filter((elem) => elem.type === "text")[0]?.elements;


    const handleMouseDown = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const offset = 10;
        if (
            e.clientX > rect.right - offset ||
            e.clientY > rect.bottom - offset
        ) {
            setIsResizing(true);
            resizingRef.current = target as HTMLDivElement;
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isResizing && resizingRef.current) {
            const target = resizingRef.current;
            const rect = target.getBoundingClientRect();

            if (
                e.clientX > rect.right - 10 ||
                e.clientY > rect.bottom - 10
            ) {

                setIsResizing(true);
            } else {
                setIsResizing(false);
            }
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
        resizingRef.current = null;
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    return (
        <div >
            {headings?.map((heading: element) => (
                <div>
                    <motion.h1
                        key={heading.id}
                        id={heading.id}
                        contentEditable="true"
                        style={{
                            fontSize: '18px',
                            padding: '10px',
                            border: '1px solid black',
                            outline: 'none',
                            display: 'block',
                            resize: 'both',
                            minHeight: '20px',
                            minWidth: '50px',
                            overflow: 'hidden',
                            width: "350px",
                            height: "200px",
                            borderRadius: '10px',
                            userSelect: isResizing ? 'none' : 'auto',
                            cursor: isResizing ? 'nwse-resize' : 'default',
                            position: 'absolute',
                            opacity: 0.5
                        }}
                        drag={!isResizing}
                        dragMomentum={false}
                        dragConstraints={canvasRef}
                        dragElastic={false}
                        onMouseDown={handleMouseDown}
                        onFocus={(e) => {
                            const elem1 = document.getElementById(heading.id as string);
                            if (!elem1) return;
                            if (elem1.innerText !== heading.text && getComputedStyle(elem1).opacity === "1") return;
                            elem1.innerText = ""
                            elem1.style.opacity = "1";
                        }}
                    >
                        {heading.text}
                    </motion.h1>
                </div>
            ))}
        </div>
    );
}

export default TextComponent;
