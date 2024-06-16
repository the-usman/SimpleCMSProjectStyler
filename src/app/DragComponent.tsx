

import React, { useEffect, useState } from 'react'

const DragComponent = ({ children, id }: { children: React.ReactNode, id: string }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragableComponent, setDargableComponent] = useState<string>("");
    const onMouseDown = (e: any) => {
        setDargableComponent(id);
        setIsDragging(true);
    }

    useEffect(() => {
        const handleMove = (event: MouseEvent | TouchEvent) => {
            
            if (isDragging) {
                const movingDiv = document.getElementById(id);
                console.log("moving div is ",id);
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
                    if (x > 300) {
                        movingDiv.style.left = x + 'px';
                        movingDiv.style.top = y + 'px';
                    }
                    else if (x < 300) {
                        movingDiv.style.left = 300 + 'px';
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
        <div
            id={id}
            onMouseDown={(e) => onMouseDown(e)} style={{ position: 'absolute' }}>
            <div style={ {width: "400px", position: 'relative'}}><span className='cursor-pointer p-2 select-none absolute left-[-2%] -top-[55%]'>"</span>
                {children}
            </div>
        </div>
    )
}

export default DragComponent
