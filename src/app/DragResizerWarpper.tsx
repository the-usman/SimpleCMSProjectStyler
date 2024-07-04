import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import TextEditor from './SelectionWraper';
import { DragResizeProps } from './types';
import { useResizable } from './useResizeable';
import { useDraggable } from './useDragable';


const DraggableResizableComponent = ({ children, id, conRef, onClick,  autoHeight = true }: DragResizeProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const buttonLockRef = useRef<HTMLButtonElement>(null);
    const childRef = useRef<HTMLDivElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    // const [isResizing, setIsResizing] = useState(false);
    // const [dragLock, setDragLock] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    // const [offsetX, setOffsetX] = useState(50);
    // const [offsetY, setOffsetY] = useState(50);
    const [isActive, setIsActive] = useState<boolean>(false);

    const { isResizing, width, height, topRef, bottomRef, leftRef, rightRef, topLeftRef, topRightRef, bottomLeftRef, bottomRightRef, left, right, bottom, top} = useResizable(ref, conRef,);

    // const onMouseDownDrag = (e: React.MouseEvent) => {
    //     if (isResizing) return;
    //     e.stopPropagation();
    //     const movingDiv = ref.current;
    //     if (movingDiv) {
    //         setIsDragging(true);
    //         setStartX(e.clientX - movingDiv.offsetLeft);
    //         setStartY(e.clientY - movingDiv.offsetTop);
    //         setOffsetX(movingDiv.offsetLeft);
    //         setOffsetY(movingDiv.offsetTop);
    //     }
    // };

    const { onMouseDownDrag, offsetX, offsetY, dragLock, setDragLock } = useDraggable(ref, conRef, true);


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
                    
                })
            }
        }
    }, [])

    useEffect(() => {
        buttonLockRef.current?.addEventListener('click', (e) => {
            e.stopPropagation();
            setDragLock(!dragLock);
        })
    })


    return (
        <div
            tabIndex={100}
            ref={ref}
            id={id}
            onMouseDown={(e) => onMouseDownDrag(e)}
            style={{
                position: 'absolute', left: offsetX, top: offsetY, boxSizing: 'border-box', padding: '10px',
                border: isActive ? '1px solid black' : 'none',
            }}
            className={`mainDivResizer mainDivResizer_${id} `}
        >
            <span style={{ position: 'absolute', zIndex: -1, color: 'transparent' }}>usman</span>
            <div ref={childRef} className='overflow-hidden w-[100%] h-[100%]'>
                <TextEditor id={id}>
                    {children}
                </TextEditor>
            </div>

            <div ref={topLeftRef} className={`topLeftRef absolute ${isActive && ('h-[40px] w-[40px]')} cursor-nw-resize`} style={{ top: '-40px', left: '-40px', borderLeft: '1px solid black', borderTop: '1px solid black', borderStyle: 'dashed' }}></div>
            <div ref={topRightRef} className={`topRightRef absolute ${isActive && ('h-[40px] w-[40px]')} cursor-ne-resize`} style={{ top: '-40px', right: '-40px', borderRight: '1px solid black', borderTop: '1px solid black', borderStyle: 'dashed' }}></div>
            <div ref={bottomLeftRef} className={`bottomLeftRef absolute ${isActive && ('h-[40px] w-[40px]')} cursor-sw-resize`} style={{ bottom: '-40px', left: '-40px', borderLeft: '1px solid black', borderBottom: '1px solid black', borderStyle: 'dashed' }}></div>
            <div ref={bottomRightRef} className={`bottomRightRef absolute ${isActive && ('h-[40px] w-[40px]')} cursor-se-resize`} style={{ bottom: '-40px', right: '-40px', borderRight: '1px solid black', borderBottom: '1px solid black', borderStyle: 'dashed' }}></div>

            <div ref={topRef} className={`topRef absolute ${isActive && ('h-[30px] w-[calc(100%+60px)]')}  cursor-ns-resize`} style={{ top: '-30px', left: '-30px', borderTop: '1px solid black', borderStyle: 'dashed' }}></div>
            <div ref={leftRef} className={`leftRef absolute ${isActive && ('h-[calc(100%+60px)] w-[30px]')} cursor-ew-resize`} style={{ top: '-30px', left: '-30px', borderLeft: '1px solid black', borderStyle: 'dashed' }}></div>
            <div ref={rightRef} className={`rightRef absolute ${isActive && ('h-[calc(100%+60px)] w-[30px]')}  cursor-ew-resize`} style={{ top: '-30px', right: '-30px', borderRight: '1px solid black', borderStyle: 'dashed' }}></div>
            <div ref={bottomRef} className={`bottomRef absolute ${isActive && ('h-[30px] w-[calc(100%+60px)]')}  cursor-ns-resize`} style={{ bottom: '-30px', left: '-30px', width: `calc(100% +60px)`, borderBottom: '1px solid black', borderStyle: 'dashed' }}></div>
            {isActive && <button
                className={`bottomRef absolute flex justify-center`}
                style={{ top: '-60px', width: `calc(100% +60px)`, zIndex: 999999999999 }}
                ref={buttonLockRef}
            >
                {dragLock ? <Image src={'/locked.png'} width={30} height={30} alt='locked' /> : <Image src={'/open-lock.png'} alt='lock' width={30} height={30} />}
            </button>}
        </div>
    );
};

export default DraggableResizableComponent;
