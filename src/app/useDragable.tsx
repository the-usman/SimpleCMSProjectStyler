import { useEffect, useState } from 'react';

export const useDraggable = (ref: React.RefObject<HTMLElement>, conRef: React.RefObject<HTMLElement>, autoHeight = false) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [offsetX, setOffsetX] = useState(50);
    const [offsetY, setOffsetY] = useState(50);
    const [dragLock, setDragLock] = useState(false);

    useEffect(() => {
        if (dragLock) return;
        const dragableElem = ref.current;
        if (!dragableElem) return;
        dragableElem.style.top = `${offsetY}px`;
        dragableElem.style.left = `${offsetX}px`;

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
    
                    const isNearBottom = containerRect.height - (y + elementRect.height) <= 200;
                    const isNearRightEdge = x + elementRect.width >= containerRect.width;
    
                    if (isNearBottom && y >= 0 && !isNearRightEdge && autoHeight) {
                        container.style.height = `${containerRect.height + 100}px`;
                        console.log(`${containerRect.height + 100}px`);
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
    }, [isDragging, startX, startY, conRef]);

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

    return { onMouseDownDrag, offsetX, offsetY, dragLock, setDragLock };
};
