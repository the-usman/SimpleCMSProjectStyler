import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';

export const useResizable = (ref: React.RefObject<HTMLElement>, conRef: React.RefObject<HTMLElement>) => {
    const [isResizing, setIsResizing] = useState(false);
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const topRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const topLeftRef = useRef<HTMLDivElement>(null);
    const topRightRef = useRef<HTMLDivElement>(null);
    const bottomLeftRef = useRef<HTMLDivElement>(null);
    const bottomRightRef = useRef<HTMLDivElement>(null);
    const [left, setLeft] = useState(100);
    const [top, setTop] = useState(100);
    const [right, setRight] = useState(100);
    const [bottom, setBottom] = useState(100);


    useEffect(() => {
        const resizeableEle = ref.current;
        if (!resizeableEle) return;
        const styles = window.getComputedStyle(resizeableEle as HTMLElement);
        let width = parseInt(styles.width, 0);
        let height = parseInt(styles.height, 0);
        let x = 0;
        let y = 0;

        resizeableEle.style.top = styles.top + 'px';;
        resizeableEle.style.left = styles.left + 'px';

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
                setWidth(width);
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
            setLeft(parseFloat(styles.left));
            document.addEventListener("mousemove", onMouseMoveRightResize);
            document.addEventListener("mouseup", onMouseUpRightResize);
        };

        const minHeight = 30;
        const onMouseMoveTopResize = (event: MouseEvent) => {
            const dy = event.clientY - y;
            const newHeight = height - dy;
            const elementRect = resizeableEle.getBoundingClientRect();
            if (newHeight > minHeight && elementRect.top + dy >= containerRect.top) {
                height = newHeight;
                y = event.clientY;
                resizeableEle.style.height = `${height}px`;
                setHeight(height);
                const currentTop = parseInt(resizeableEle.style.top || '0', 0);
                resizeableEle.style.top = `${currentTop + dy}px`;
                setTop(currentTop + dy);
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
            setBottom(parseFloat(styles.bottom));
            document.addEventListener("mousemove", onMouseMoveTopResize);
            document.addEventListener("mouseup", onMouseUpTopResize);
        };

        const onMouseMoveBottomResize = (event: MouseEvent) => {
            const dy = event.clientY - y;
            const newHeight = height + dy;
            const elementRect = resizeableEle.getBoundingClientRect();
            if (elementRect.bottom + dy <= containerRect.bottom) {
                height = newHeight;
                y = event.clientY;
                resizeableEle.style.height = `${height}px`;
                setHeight(height);
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
            setTop(parseFloat(styles.top));
            document.addEventListener("mousemove", onMouseMoveBottomResize);
            document.addEventListener("mouseup", onMouseUpBottomResize);
        };

        const minWidth = 30;
        const onMouseMoveLeftResize = (event: MouseEvent) => {
            const dx = event.clientX - x;
            const newWidth = width - dx;
            const elementRect = resizeableEle.getBoundingClientRect();
            if (newWidth >= minWidth && elementRect.left + dx >= containerRect.left) {
                width = newWidth;
                x = event.clientX;
                const currentLeft = parseInt(resizeableEle.style.left || '0', 10);
                setLeft(currentLeft + dx);
                resizeableEle.style.left = `${currentLeft + dx}px`;
                resizeableEle.style.width = `${width}px`;
                setWidth(width);
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
            setRight(parseFloat(styles.right));

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
                setTop(currentTop + dy);
                setLeft(currentLeft + dx);
                setHeight(height);
                setWidth(width);
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
            setRight(parseFloat(styles.right));
            resizeableEle.style.bottom = styles.bottom;
            setBottom(parseFloat(styles.bottom));
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
                setTop(currentTop + dy);
                setHeight(height);
                setWidth(width);
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
            setLeft(parseFloat(styles.left));
            resizeableEle.style.bottom = styles.bottom;
            setBottom(parseFloat(styles.bottom));
            document.addEventListener("mousemove", onMouseMoveTopRightResize);
            document.addEventListener("mouseup", onMouseUpTopRightResize);
        };

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
                setLeft(currentLeft + dx)
                setWidth(width);
                setHeight(height);
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
            setRight(parseFloat(styles.right));
            setTop(parseFloat(styles.top));
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
                setWidth(width);
                setHeight(height);
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
            setLeft(parseFloat(styles.left));
            setTop(parseFloat(styles.top));
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

    return { isResizing, width, height, topRef, bottomRef, leftRef, rightRef, topLeftRef, topRightRef, bottomLeftRef, bottomRightRef, left, right, bottom, top};
};
