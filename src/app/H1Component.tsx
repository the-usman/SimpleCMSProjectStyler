import React, { useState, useRef, useEffect, useContext, FC } from 'react';

import { element } from './types';
import { AppContext } from '@/context/indext';

type H1props = {
    canvasRef: React.RefObject<HTMLDivElement>
}

const H1Component: FC<H1props> = ({ canvasRef }) => {
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const resizingRef = useRef<HTMLDivElement | null>(null);
    const context = useContext(AppContext);
    const [isDragging, setIsDragging] = useState(false);
    const [dragableComponent, setDargableComponent] = useState<string>("");
    const headings = context?.elements?.filter((elem) => elem.type === "heading")[0]?.elements;


    const handleMouseDown = (e: any, id:string) => {
        const target = e.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const offset = 10;
        let clientX: number;
        let clientY: number;
        if (e instanceof MouseEvent) {
            clientX = e.clientX;
            clientY = e.clientY;
        } else if (e instanceof TouchEvent) {
            if (e.touches) {
                clientX = e?.touches[0].clientX;
                clientY = e?.touches[0].clientY;
            }
            else {
                clientX = 0;
                clientY = 0;
            }
        }
        else {
            clientX = 0;
            clientY = 0;
        }
        
        if (
            clientX > rect.right - offset ||
            clientY > rect.bottom - offset
        ) {
            setIsResizing(true);
            resizingRef.current = target as HTMLDivElement;
        }
        else {
            setDargableComponent(id);
            setIsDragging(true);
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
                // setDargableComponent(id);
                // setIsDragging(true);
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



    useEffect(() => {
        const handleMove = (event: MouseEvent | TouchEvent) => {
            
            if (isDragging) {
                const movingDiv = document.getElementById(dragableComponent);
                console.log(movingDiv);
                // console.log(event);
                let clientX: number;
                let clientY: number;
                if (movingDiv) {
                    if (event instanceof MouseEvent) {
                        clientX = event.clientX;
                        clientY = event.clientY;
                    } else {
                        clientX = event.touches[0].clientX;
                        clientY = event.touches[0].clientY;
                    }

                    const maxX = window.innerWidth - movingDiv.offsetWidth;
                    const maxY = window.innerHeight - movingDiv.offsetHeight;

                    const x = Math.min(Math.max(0, clientX), maxX);
                    const y = Math.min(Math.max(0, clientY), maxY);
                    if (x > 300 && event instanceof MouseEvent) {
                        movingDiv.style.left = x + 'px';
                        movingDiv.style.top = y + 'px';
                    }
                }
            }
        };

        const handleEnd = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleEnd);
            document.addEventListener('touchmove', handleMove, { passive: false });
            document.addEventListener('touchend', handleEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging]);

    return (
        <div >
            {headings?.map((heading: element) => (
                <div>
                    <h1
                        key={heading.id}
                        id={heading.id}
                        contentEditable="true"
                        style={{
                            fontSize: '28px',
                            padding: '10px',
                            border: '1px solid black',
                            outline: 'none',
                            display: 'block',
                            resize: 'both',
                            minHeight: '30px',
                            minWidth: '150px',
                            overflow: 'hidden',
                            borderRadius: '10px',
                            userSelect: isResizing ? 'none' : 'auto',
                            cursor: isResizing ? 'nwse-resize' : 'default',
                            position: 'absolute',
                            opacity: 0.5
                        }}
                        // drag={!isResizing}
                        // dragMomentum={false}
                        // dragConstraints={canvasRef}
                        // dragElastic={false}
                        onMouseDown={(e) => { handleMouseDown(e, heading.id as string) }}
                        onTouchStart={(e) => { handleMouseDown(e, heading.id as string) }}

                        onFocus={(e) => {
                            const elem1 = document.getElementById(heading.id as string);
                            if (!elem1) return;
                            if (elem1.innerText !== heading.text && getComputedStyle(elem1).opacity === "1") return;
                            elem1.innerText = ""
                            elem1.style.opacity = "1";
                        }}
                    >
                        {heading.text}
                    </h1>
                </div>
            ))}
        </div>
    );
}

export default H1Component;
