import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { element } from './types';

type H1props = {
    headings: element[],
    canvasRef: React.RefObject<HTMLDivElement>
}

const H1Component: React.FC<H1props> = ({ headings, canvasRef }) => {
    const [isResizing, setIsResizing] = useState(false);
    const resizingRef = useRef<HTMLDivElement | null>(null);

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
        <div>
            {headings.map((heading: element) => (
                <motion.h1
                    key={heading.id}
                    id={heading.id}
                    contentEditable="true"
                    style={{
                        fontSize: '28px',
                        padding: '10px',
                        border: '1px solid black',
                        outline: 'none',
                        display: 'inline-block',
                        resize: "both",
                        minHeight: '30px',
                        minWidth: '30px',
                        overflow: 'hidden',
                        userSelect: isResizing ? 'none' : 'auto', 
                        cursor: isResizing ? 'nwse-resize' : 'default' 
                    }}
                    drag={!isResizing}
                    dragMomentum={false}
                    dragConstraints={canvasRef}
                    dragElastic={false}
                    onMouseDown={handleMouseDown}
                >
                    {heading.text}
                </motion.h1>
            ))}
        </div>
    );
}

export default H1Component;
