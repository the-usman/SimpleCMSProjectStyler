import React, { useRef, useEffect, useState } from 'react';

const ResizableComponent = ({children, id, conRef, isActive, setIsResizing }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeableEle = ref.current;
    if (!resizeableEle) return;
    const styles = window.getComputedStyle(resizeableEle as HTMLElement);
    let width = parseInt(styles.width, 0);
    let height = parseInt(styles.height, 0);
    let x = 0;
    let y = 0;

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

    // Top-right resize
    const onMouseMoveTopRightResize = (event: MouseEvent) => {
      onMouseMoveRightResize(event);
      onMouseMoveTopResize(event);
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
      document.addEventListener("mousemove", onMouseMoveTopRightResize);
      document.addEventListener("mouseup", onMouseUpTopRightResize);
    };

    // Bottom-right resize
    const onMouseMoveBottomRightResize = (event: MouseEvent) => {
      onMouseMoveRightResize(event);
      onMouseMoveBottomResize(event);
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
      document.addEventListener("mousemove", onMouseMoveBottomRightResize);
      document.addEventListener("mouseup", onMouseUpBottomRightResize);
    };

    // Bottom-left resize
    const onMouseMoveBottomLeftResize = (event: MouseEvent) => {
      onMouseMoveBottomResize(event);
      onMouseMoveLeftResize(event);
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
      document.addEventListener("mousemove", onMouseMoveBottomLeftResize);
      document.addEventListener("mouseup", onMouseUpBottomLeftResize);
    };

    // Top-left resize
    const onMouseMoveTopLeftResize = (event: MouseEvent) => {
      onMouseMoveTopResize(event);
      onMouseMoveLeftResize(event);
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
      document.addEventListener("mousemove", onMouseMoveTopLeftResize);
      document.addEventListener("mouseup", onMouseUpTopLeftResize);
    };

    const resizers = [
      { ref: rightRef, onMouseDown: onMouseDownRightResize },
      { ref: topRef, onMouseDown: onMouseDownTopResize },
      { ref: bottomRef, onMouseDown: onMouseDownBottomResize },
      { ref: leftRef, onMouseDown: onMouseDownLeftResize },
      { ref: topRightRef, onMouseDown: onMouseDownTopRightResize },
      { ref: bottomRightRef, onMouseDown: onMouseDownBottomRightResize },
      { ref: bottomLeftRef, onMouseDown: onMouseDownBottomLeftResize },
      { ref: topLeftRef, onMouseDown: onMouseDownTopLeftResize },
    ];

    resizers.forEach(({ ref, onMouseDown }) => {
      if (ref.current) {
        ref.current.addEventListener("mousedown", onMouseDown);
      }
    });

    return () => {
      resizers.forEach(({ ref, onMouseDown }) => {
        if (ref.current) {
          ref.current.removeEventListener("mousedown", onMouseDown);
        }
      });
    };
  }, [conRef]);

  return (
    <div
      ref={ref}
      id={id}
      style={{ width: '150px', height: '150px', position: 'absolute' }}
      className={`mainDivResizer mainDivResizer_${id} ${isActive ? 'border border-black' : 'border-none'}`}
    >
      {children}
      <div ref={topRef} className="resizer resizer-t" />
      <div ref={leftRef} className="resizer resizer-l" />
      <div ref={rightRef} className="resizer resizer-r" />
      <div ref={bottomRef} className="resizer resizer-b" />
      <div ref={topLeftRef} className="resizer resizer-tl" />
      <div ref={topRightRef} className="resizer resizer-tr" />
      <div ref={bottomLeftRef} className="resizer resizer-bl" />
      <div ref={bottomRightRef} className="resizer resizer-br" />
    </div>
  );
};

export default ResizableComponent;
