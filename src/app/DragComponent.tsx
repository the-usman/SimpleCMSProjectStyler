import React, { useEffect, useState } from 'react';

const DragComponent = ({ children, id }: { children: React.ReactNode, id: string }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        const movingDiv = document.getElementById(id);
        if (movingDiv) {
            setIsDragging(true);
            setStartX(e.clientX - movingDiv.offsetLeft);
            setStartY(e.clientY - movingDiv.offsetTop);
            setOffsetX(movingDiv.offsetLeft);
            setOffsetY(movingDiv.offsetTop);
        }
    };

    useEffect(() => {
        const handleMove = (event: MouseEvent | TouchEvent) => {
            if (isDragging) {
                const movingDiv = document.getElementById(id);
                if (movingDiv) {
                    let clientX: number;
                    let clientY: number;
                    if (event instanceof MouseEvent) {
                        clientX = event.clientX;
                        clientY = event.clientY;
                    } else {
                        clientX = event.touches[0].clientX;
                        clientY = event.touches[0].clientY;
                    }

                    const x = clientX - startX;
                    const y = clientY - startY;

                    movingDiv.style.left = `${x}px`;
                    movingDiv.style.top = `${y}px`;
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
    }, [isDragging, startX, startY]);

    

    return (
        <div
            id={id}
            onMouseDown={(e) => onMouseDown(e)}
            style={{ position: 'absolute', left: offsetX, top: offsetY }}
        >
            dd
            {children}
        </div>
    );
};

export default DragComponent;
