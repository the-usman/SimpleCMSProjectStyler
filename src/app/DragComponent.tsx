import React, { useRef, useState, useEffect } from 'react';

type Sizer = {
    clientX: number,
    clientY: number
};

const DraggableComponent = ({ children, id, conRef, onClick, dragLock, setDragLock, isActive, setIsActive, offsetX, offsetY, setOffsetX, setOffsetY }: any) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    const onMouseDownDrag = (e: React.MouseEvent) => {
        e.stopPropagation();
        const movingDiv = ref.current;
        if (movingDiv) {
            setIsDragging(true);
            setStartX(e.clientX - movingDiv.offsetLeft);
            setStartY(e.clientY - movingDiv.offsetTop);
            setOffsetX(movingDiv.offsetLeft);
            setOffsetY(movingDiv.offsetTop);
        }
    };

    useEffect(() => {
        if (dragLock) return;
        const resizeableEle = ref.current;
        if (!resizeableEle) return;
        resizeableEle.style.top = `${offsetY}px`;
        resizeableEle.style.left = `${offsetX}px`;

        const container = conRef.current;
        if (!container) return;

        const handleMove = (event: MouseEvent | TouchEvent) => {
            if (isDragging) {
                const movingDiv = ref.current;
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

                    const containerRect = container.getBoundingClientRect();
                    const elementRect = movingDiv.getBoundingClientRect();

                    if (x >= 0 && x + elementRect.width <= containerRect.width) {
                        setOffsetX(x);
                    }

                    if (y >= 0 && y + elementRect.height <= containerRect.height) {
                        setOffsetY(y);
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
    }, [isDragging, startX, startY, conRef, dragLock, offsetX, offsetY]);

    return (
        <div
            ref={ref}
            id={id}
            onMouseDown={(e) => onMouseDownDrag(e)}
            style={{ position: 'absolute', left: offsetX, top: offsetY, boxSizing: 'border-box', padding: '10px' }}
            className={`mainDivDrager mainDivDrager_${id} ${isActive ? 'border border-black' : 'border-none'}`}
        >
            {children}
        </div>
    );
};

export default DraggableComponent;
