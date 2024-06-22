import React, { useRef, useState, useEffect } from 'react';

type Sizer = {
    clientX: number,
    clientY: number
};

const DraggableResizableComponent = ({ children, id, conRef, onClick }: { children: React.ReactNode, id: string, conRef?: any, onClick?: VoidFunction }) => {
    const ref = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const topLeftRef = useRef<HTMLDivElement>(null);
    const topRightRef = useRef<HTMLDivElement>(null);
    const bottomLeftRef = useRef<HTMLDivElement>(null);
    const bottomRightRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLDivElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [pos, setPos] = useState<Sizer>({ clientX: 0, clientY: 0 });
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [offsetX, setOffsetX] = useState(50);
    const [offsetY, setOffsetY] = useState(50);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        const resizeableEle = ref.current;
        if (!resizeableEle) return;
        const styles = window.getComputedStyle(resizeableEle as HTMLElement);
        let width = parseInt(styles.width, 0);
        let height = parseInt(styles.height, 0);
        let x = 0;
        let y = 0;

        resizeableEle.style.top = `${offsetY}px`;
        resizeableEle.style.left = `${offsetX}px`;

        const container = conRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();

        // Right resize
        const onMouseMoveRightResize = (event: MouseEvent) => {
            const dx = event.clientX - x;
            x = event.clientX;
            const newWidth = width + dx;
            const elementRect = resizeableEle.getBoundingClientRect();
            if (elementRect.right + dx <= containerRect.right) {
                width = newWidth;
                resizeableEle.style.width = `${width}px`;
            }
        };

        const onMouseUpRightResize = () => {
            setIsResizing(false);
            document.removeEventListener("mousemove", onMouseMoveRightResize);
            document.removeEventListener("mouseup", onMouseUpRightResize);
        };

        const onMouseDownRightResize = (event: MouseEvent) => {
            event.stopPropagation();
            x = event.clientX;
            setIsResizing(true);
            resizeableEle.style.left = styles.left;
            document.addEventListener("mousemove", onMouseMoveRightResize);
            document.addEventListener("mouseup", onMouseUpRightResize);
        };

        // Top resize
        const minHeight = 30;
        const onMouseMoveTopResize = (event: MouseEvent) => {
            const dy = event.clientY - y;
            const newHeight = height - dy;
            const elementRect = resizeableEle.getBoundingClientRect();
            if (newHeight > minHeight && elementRect.top + dy >= containerRect.top) {
                height = newHeight;
                y = event.clientY;
                resizeableEle.style.height = `${height}px`;
                const currentTop = parseInt(resizeableEle.style.top || '0', 0);
                resizeableEle.style.top = `${currentTop + dy}px`;
            }
        };

        const onMouseUpTopResize = () => {
            setIsResizing(false);
            document.removeEventListener("mousemove", onMouseMoveTopResize);
            document.removeEventListener("mouseup", onMouseUpTopResize);
        };

        const onMouseDownTopResize = (event: MouseEvent) => {
            event.stopPropagation();
            y = event.clientY;
            setIsResizing(true);
            const styles = window.getComputedStyle(resizeableEle);
            resizeableEle.style.bottom = styles.bottom;
            document.addEventListener("mousemove", onMouseMoveTopResize);
            document.addEventListener("mouseup", onMouseUpTopResize);
        };

        // Bottom resize
        const onMouseMoveBottomResize = (event: MouseEvent) => {
            const dy = event.clientY - y;
            const newHeight = height + dy;
            const elementRect = resizeableEle.getBoundingClientRect();
            if (elementRect.bottom + dy <= containerRect.bottom) {
                height = newHeight;
                y = event.clientY;
                resizeableEle.style.height = `${height}px`;
            }
        };

        const onMouseUpBottomResize = () => {
            setIsResizing(false);
            document.removeEventListener("mousemove", onMouseMoveBottomResize);
            document.removeEventListener("mouseup", onMouseUpBottomResize);
        };

        const onMouseDownBottomResize = (event: MouseEvent) => {
            event.stopPropagation();
            y = event.clientY;
            setIsResizing(true);
            const styles = window.getComputedStyle(resizeableEle);
            resizeableEle.style.top = styles.top;
            document.addEventListener("mousemove", onMouseMoveBottomResize);
            document.addEventListener("mouseup", onMouseUpBottomResize);
        };

        // Left resize
        const minWidth = 30;
        const onMouseMoveLeftResize = (event: MouseEvent) => {
            const dx = event.clientX - x;
            const newWidth = width - dx;
            const elementRect = resizeableEle.getBoundingClientRect();
            if (newWidth >= minWidth && elementRect.left + dx >= containerRect.left) {
                width = newWidth;
                x = event.clientX;
                const currentLeft = parseInt(resizeableEle.style.left || '0', 10);
                resizeableEle.style.left = `${currentLeft + dx}px`;
                resizeableEle.style.width = `${width}px`;
            }
        };

        const onMouseUpLeftResize = () => {
            setIsResizing(false);
            document.removeEventListener("mousemove", onMouseMoveLeftResize);
            document.removeEventListener("mouseup", onMouseUpLeftResize);
        };

        const onMouseDownLeftResize = (event: MouseEvent) => {
            event.stopPropagation();
            x = event.clientX;
            setIsResizing(true);
            resizeableEle.style.right = styles.right;
            document.addEventListener("mousemove", onMouseMoveLeftResize);
            document.addEventListener("mouseup", onMouseUpLeftResize);
        };

        // Top-left resize
        const onMouseMoveTopLeftResize = (event: MouseEvent) => {
            const dx = event.clientX - x;
            const dy = event.clientY - y;
            const newWidth = width - dx;
            const newHeight = height - dy;
            const elementRect = resizeableEle.getBoundingClientRect();
            if (newWidth >= minWidth && newHeight >= minHeight && elementRect.left + dx >= containerRect.left && elementRect.top + dy >= containerRect.top) {
                width = newWidth;
                height = newHeight;
                x = event.clientX;
                y = event.clientY;
                const currentLeft = parseInt(resizeableEle.style.left || '0', 10);
                const currentTop = parseInt(resizeableEle.style.top || '0', 10);
                resizeableEle.style.left = `${currentLeft + dx}px`;
                resizeableEle.style.top = `${currentTop + dy}px`;
                resizeableEle.style.width = `${width}px`;
                resizeableEle.style.height = `${height}px`;
            }
        };

        const onMouseUpTopLeftResize = () => {
            setIsResizing(false);
            document.removeEventListener("mousemove", onMouseMoveTopLeftResize);
            document.removeEventListener("mouseup", onMouseUpTopLeftResize);
        };

        const onMouseDownTopLeftResize = (event: MouseEvent) => {
            event.stopPropagation();
            x = event.clientX;
            y = event.clientY;
            setIsResizing(true);
            resizeableEle.style.right = styles.right;
            resizeableEle.style.bottom = styles.bottom;
            document.addEventListener("mousemove", onMouseMoveTopLeftResize);
            document.addEventListener("mouseup", onMouseUpTopLeftResize);
        };

        // Top-right resize
        const onMouseMoveTopRightResize = (event: MouseEvent) => {
            const dx = event.clientX - x;
            const dy = event.clientY - y;
            const newWidth = width + dx;
            const newHeight = height - dy;
            const elementRect = resizeableEle.getBoundingClientRect();
            if (newWidth >= minWidth && newHeight >= minHeight && elementRect.right + dx <= containerRect.right && elementRect.top + dy >= containerRect.top) {
                width = newWidth;
                height = newHeight;
                x = event.clientX;
                y = event.clientY;
                const currentTop = parseInt(resizeableEle.style.top || '0', 10);
                resizeableEle.style.top = `${currentTop + dy}px`;
                resizeableEle.style.width = `${width}px`;
                resizeableEle.style.height = `${height}px`;
            }
        };

        const onMouseUpTopRightResize = () => {
            setIsResizing(false);
            document.removeEventListener("mousemove", onMouseMoveTopRightResize);
            document.removeEventListener("mouseup", onMouseUpTopRightResize);
        };

        const onMouseDownTopRightResize = (event: MouseEvent) => {
            event.stopPropagation();
            x = event.clientX;
            y = event.clientY;
            setIsResizing(true);
            resizeableEle.style.left = styles.left;
            resizeableEle.style.bottom = styles.bottom;
            document.addEventListener("mousemove", onMouseMoveTopRightResize);
            document.addEventListener("mouseup", onMouseUpTopRightResize);
        };

        // Bottom-left resize
        const onMouseMoveBottomLeftResize = (event: MouseEvent) => {
            const dx = event.clientX - x;
            const dy = event.clientY - y;
            const newWidth = width - dx;
            const newHeight = height + dy;
            const elementRect = resizeableEle.getBoundingClientRect();
            if (newWidth >= minWidth && newHeight >= minHeight && elementRect.left + dx >= containerRect.left && elementRect.bottom + dy <= containerRect.bottom) {
                width = newWidth;
                height = newHeight;
                x = event.clientX;
                y = event.clientY;
                const currentLeft = parseInt(resizeableEle.style.left || '0', 10);
                resizeableEle.style.left = `${currentLeft + dx}px`;
                resizeableEle.style.width = `${width}px`;
                resizeableEle.style.height = `${height}px`;
            }
        };

        const onMouseUpBottomLeftResize = () => {
            setIsResizing(false);
            document.removeEventListener("mousemove", onMouseMoveBottomLeftResize);
            document.removeEventListener("mouseup", onMouseUpBottomLeftResize);
        };

        const onMouseDownBottomLeftResize = (event: MouseEvent) => {
            event.stopPropagation();
            x = event.clientX;
            y = event.clientY;
            setIsResizing(true);
            resizeableEle.style.right = styles.right;
            resizeableEle.style.top = styles.top;
            document.addEventListener("mousemove", onMouseMoveBottomLeftResize);
            document.addEventListener("mouseup", onMouseUpBottomLeftResize);
        };

        // Bottom-right resize
        const onMouseMoveBottomRightResize = (event: MouseEvent) => {
            const dx = event.clientX - x;
            const dy = event.clientY - y;
            const newWidth = width + dx;
            const newHeight = height + dy;
            const elementRect = resizeableEle.getBoundingClientRect();
            if (elementRect.right + dx <= containerRect.right && elementRect.bottom + dy <= containerRect.bottom) {
                width = newWidth;
                height = newHeight;
                x = event.clientX;
                y = event.clientY;
                resizeableEle.style.width = `${width}px`;
                resizeableEle.style.height = `${height}px`;
            }
        };

        const onMouseUpBottomRightResize = () => {
            setIsResizing(false);
            document.removeEventListener("mousemove", onMouseMoveBottomRightResize);
            document.removeEventListener("mouseup", onMouseUpBottomRightResize);
        };

        const onMouseDownBottomRightResize = (event: MouseEvent) => {
            event.stopPropagation();
            x = event.clientX;
            y = event.clientY;
            setIsResizing(true);
            resizeableEle.style.left = styles.left;
            resizeableEle.style.top = styles.top;
            document.addEventListener("mousemove", onMouseMoveBottomRightResize);
            document.addEventListener("mouseup", onMouseUpBottomRightResize);
        };

        const resizerRight = rightRef.current;
        if (resizerRight) resizerRight.addEventListener("mousedown", onMouseDownRightResize);
        const resizerTop = topRef.current;
        if (resizerTop) resizerTop.addEventListener("mousedown", onMouseDownTopResize);
        const resizerBottom = bottomRef.current;
        if (resizerBottom) resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
        const resizerLeft = leftRef.current;
        if (resizerLeft) resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);
        const resizerTopLeft = topLeftRef.current;
        if (resizerTopLeft) resizerTopLeft.addEventListener("mousedown", onMouseDownTopLeftResize);
        const resizerTopRight = topRightRef.current;
        if (resizerTopRight) resizerTopRight.addEventListener("mousedown", onMouseDownTopRightResize);
        const resizerBottomLeft = bottomLeftRef.current;
        if (resizerBottomLeft) resizerBottomLeft.addEventListener("mousedown", onMouseDownBottomLeftResize);
        const resizerBottomRight = bottomRightRef.current;
        if (resizerBottomRight) resizerBottomRight.addEventListener("mousedown", onMouseDownBottomRightResize);

        return () => {
            if (resizerRight) resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
            if (resizerTop) resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
            if (resizerBottom) resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
            if (resizerLeft) resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
            if (resizerTopLeft) resizerTopLeft.removeEventListener("mousedown", onMouseDownTopLeftResize);
            if (resizerTopRight) resizerTopRight.removeEventListener("mousedown", onMouseDownTopRightResize);
            if (resizerBottomLeft) resizerBottomLeft.removeEventListener("mousedown", onMouseDownBottomLeftResize);
            if (resizerBottomRight) resizerBottomRight.removeEventListener("mousedown", onMouseDownBottomRightResize);
        };
    }, [conRef]);

    const onMouseDownDrag = (e: React.MouseEvent) => {
        if (isResizing) return;
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
    }, [isDragging, startX, startY, conRef]);

    useEffect(() => {
        const resizeableEle = ref.current;
        if (!resizeableEle) return;

        const handleClick = (e: MouseEvent) => {
            setIsActive(true);
            
            e.stopPropagation();
            if (onClick) {
                if (childRef.current) {
                    childRef.current.addEventListener("click", (e) => {
                        onClick();
                        
                    })
                }
            }
        };

        resizeableEle.addEventListener('click', handleClick);

        return () => {
            resizeableEle.removeEventListener('click', handleClick);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = () => {
            setIsActive(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (onClick) {
            if (childRef.current) {
                childRef.current.addEventListener("click", (e) => {
                    onClick();
                    // e.stopPropagation();
                })
            }
        }
    },  [])

    return (
        <div
            ref={ref}
            id={id}
            onMouseDown={(e) => onMouseDownDrag(e)}
            style={{ position: 'absolute', left: offsetX, top: offsetY, boxSizing: 'border-box', padding: '10px' }}
            className={`mainDivResizer ${isActive ? 'border border-black' : 'border-none'}`}
        >
            <span style={{ position: 'absolute', zIndex: -1, color: 'transparent' }}>usman</span>
            <div  ref={childRef} className='overflow-hidden w-[100%] h-[100%]'>

            {children}     
            </div>
            
            <div ref={topLeftRef} className={`topLeftRef absolute ${isActive && ('h-[40px] w-[40px]')} cursor-nw-resize`} style={{ top: '-40px', left: '-40px', borderLeft: '1px solid black', borderTop: '1px solid black', borderStyle:'dashed' }}></div>
            <div ref={topRightRef} className={`topRightRef absolute ${isActive && ('h-[40px] w-[40px]')} cursor-ne-resize`} style={{ top: '-40px', right: '-40px', borderRight: '1px solid black', borderTop: '1px solid black', borderStyle:'dashed' }}></div>
            <div ref={bottomLeftRef} className={`bottomLeftRef absolute ${isActive && ('h-[40px] w-[40px]')} cursor-sw-resize`} style={{ bottom: '-40px', left: '-40px', borderLeft: '1px solid black', borderBottom: '1px solid black', borderStyle:'dashed' }}></div>
            <div ref={bottomRightRef} className={`bottomRightRef absolute ${isActive && ('h-[40px] w-[40px]')} cursor-se-resize`} style={{ bottom: '-40px', right: '-40px', borderRight: '1px solid black', borderBottom: '1px solid black', borderStyle:'dashed' }}></div>
            
            <div ref={topRef} className={`topRef absolute ${isActive && ('h-[30px] w-[calc(100%+60px)]')}  cursor-ns-resize`} style={{ top: '-30px', left: '-30px', borderTop: '1px solid black', borderStyle:'dashed' }}></div>
            <div ref={leftRef} className={`leftRef absolute ${isActive && ('h-[calc(100%+60px)] w-[30px]')} cursor-ew-resize`} style={{ top: '-30px', left: '-30px', borderLeft: '1px solid black', borderStyle:'dashed' }}></div>
            <div ref={rightRef} className={`rightRef absolute ${isActive && ('h-[calc(100%+60px)] w-[30px]')}  cursor-ew-resize`} style={{ top: '-30px', right: '-30px', borderRight: '1px solid black', borderStyle:'dashed' }}></div>
            <div ref={bottomRef} className={`bottomRef absolute ${isActive && ('h-[30px] w-[calc(100%+60px)]')}  cursor-ns-resize`} style={{ bottom: '-30px', left: '-30px', width: `calc(100% +60px)`, borderBottom: '1px solid black', borderStyle:'dashed' }}></div>
        </div>
    );
};

export default DraggableResizableComponent;
