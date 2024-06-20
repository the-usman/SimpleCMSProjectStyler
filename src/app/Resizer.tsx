import React, { useEffect, useRef, useState } from 'react';

type sizer = {
  clientX: number,
  clientY: number
}

const Resizer = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<sizer>({ clientX: 0, clientY: 0 });

  useEffect(() => {
    const resizeableEle = ref.current;
    if (!resizeableEle) return;
    const styles = window.getComputedStyle(resizeableEle as HTMLElement);
    let width = parseInt(styles.width, 10);
    let height = parseInt(styles.height, 10);
    let x = 0;
    let y = 0;

    resizeableEle.style.top = "50px";
    resizeableEle.style.left = "50px";

    // Right resize
    const onMouseMoveRightResize = (event: any) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      resizeableEle.style.width = `${width}px`;
    };

    const onMouseUpRightResize = (event: any) => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
      document.removeEventListener("mouseup", onMouseUpRightResize);
    };

    const onMouseDownRightResize = (event: any) => {
      event.stopPropagation();
      x = event.clientX;
      resizeableEle.style.left = styles.left;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Top resize
    const onMouseMoveTopResize = (event: any) => {
      const dy = event.clientY - y;
      height = height - dy;
      y = event.clientY;
      resizeableEle.style.height = `${height}px`;
    };

    const onMouseUpTopResize = (event: any) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
      document.removeEventListener("mouseup", onMouseUpTopResize);
    };

    const onMouseDownTopResize = (event: any) => {
      event.stopPropagation();
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.bottom = styles.bottom;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };

    // Bottom resize
    const onMouseMoveBottomResize = (event: any) => {
      const dy = event.clientY - y;
      height = height + dy;
      y = event.clientY;
      resizeableEle.style.height = `${height}px`;
    };

    const onMouseUpBottomResize = (event: any) => {
      document.removeEventListener("mousemove", onMouseMoveBottomResize);
      document.removeEventListener("mouseup", onMouseUpBottomResize);
    };

    const onMouseDownBottomResize = (event: any) => {
      event.stopPropagation();
      y = event.clientY;
      const styles = window.getComputedStyle(resizeableEle);
      resizeableEle.style.top = styles.top;
      document.addEventListener("mousemove", onMouseMoveBottomResize);
      document.addEventListener("mouseup", onMouseUpBottomResize);
    };

    // Left resize
    const minWidth = 100; // Set your minimum width here

    const onMouseMoveLeftResize = (event: any) => {
      const dx = event.clientX - x;
      const newWidth = width - dx;

      if (newWidth >= minWidth) {
        width = newWidth;
        x = event.clientX;
        resizeableEle.style.width = `${width}px`;

        const currentLeft = parseInt(resizeableEle.style.left || '0', 10);
        resizeableEle.style.left = `${currentLeft + dx}px`;
      } 
    };

    const onMouseUpLeftResize = (event: any) => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
      document.removeEventListener("mouseup", onMouseUpLeftResize);
    };

    const onMouseDownLeftResize = (event: any) => {
      event.stopPropagation();
      x = event.clientX;
      resizeableEle.style.right = styles.right;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    const resizerRight = rightRef.current;
    if (resizerRight) resizerRight.addEventListener("mousedown", onMouseDownRightResize);
    const resizerTop = topRef.current;
    if (resizerTop) resizerTop.addEventListener("mousedown", onMouseDownTopResize);
    const resizerBottom = bottomRef.current;
    if (resizerBottom) resizerBottom.addEventListener("mousedown", onMouseDownBottomResize);
    const resizerLeft = leftRef.current;
    if (resizerLeft) resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);

    return () => {
      if (resizerRight) resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
      if (resizerTop) resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
      if (resizerBottom) resizerBottom.removeEventListener("mousedown", onMouseDownBottomResize);
      if (resizerLeft) resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
    };
  }, []);

  return (
    <div ref={ref} className='mainDivResizer absolute'>
      {children}
      <div ref={topRef} className='topRef absolute h-[10px] cursor-ns-resize' style={{ top: 0, left: 0, right: 0 }}></div>
      <div ref={leftRef} className='leftRef absolute w-[10px] cursor-ew-resize' style={{ top: 0, bottom: 0, left: 0 }}></div>
      <div ref={rightRef} className='rightRef absolute w-[10px] cursor-ew-resize' style={{ top: 0, bottom: 0, right: 0 }}></div>
      <div ref={bottomRef} className='bottomRef absolute h-[10px] cursor-ns-resize' style={{ left: 0, right: 0, bottom: 0 }}></div>
    </div>
  );
};

export default Resizer;
