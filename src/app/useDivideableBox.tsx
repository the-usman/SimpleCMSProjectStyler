import { WidgetType } from '@uiw/react-codemirror';
import { useEffect, useState, RefObject, ReactNode } from 'react';

type UseDivideableBoxResult = [number[], () => ReactNode[] | null];

export const useDivideableBox = (
    childRef: RefObject<HTMLDivElement>,
    content: ReactNode,
    divisionCount: number
): UseDivideableBoxResult => {
    const [divisions, setDivisions] = useState<number[]>([]);
    const [previewDivision, setPreviewDivision] = useState<number | null>(null);

    useEffect(() => {
        const mainElem = childRef.current;
        if (!mainElem) {
            throw new Error('A reference to the element which is to be divided is required');
        }

        const detectDivision = (clientX: number, clientY: number): number | null => {
            const mainElemRect = mainElem.getBoundingClientRect();
            const width = mainElemRect.width;
            const height = mainElemRect.height;

            if (
                clientX < mainElemRect.left ||
                clientX > mainElemRect.right ||
                clientY < mainElemRect.top ||
                clientY > mainElemRect.bottom
            ) {
                return null;
            }

            const x = clientX - mainElemRect.left;
            const y = clientY - mainElemRect.top;

            const rowCount = Math.ceil(Math.sqrt(divisionCount));
            const colCount = Math.ceil(divisionCount / rowCount);

            const rowHeight = height / rowCount;
            const colWidth = width / colCount;

            const row = Math.floor(y / rowHeight);
            const col = Math.floor(x / colWidth);
            return row * colCount + col + 1;
        };

        const onMouseMove = (e: MouseEvent | TouchEvent) => {
            let clientX: number, clientY: number;
            if (e instanceof MouseEvent) {
                clientX = e.clientX;
                clientY = e.clientY;
            } else {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }

            const division = detectDivision(clientX, clientY);
            setPreviewDivision(division);
        };

        const onMouseUp = (e: MouseEvent | TouchEvent) => {
            let clientX: number, clientY: number;
            if (e instanceof MouseEvent) {
                clientX = e.clientX;
                clientY = e.clientY;
            } else {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }

            const division = detectDivision(clientX, clientY);

            if (division !== null && !divisions.includes(division)) {
                setDivisions((prevDivisions) => [...prevDivisions, division]);
            }
            setPreviewDivision(null);
            mainElem.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        const onMouseDown = (e: MouseEvent | TouchEvent) => {
            let clientX: number, clientY: number;
            if (e instanceof MouseEvent) {
                clientX = e.clientX;
                clientY = e.clientY;
            } else {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }

            const division = detectDivision(clientX, clientY);

            // if (division !== null) {
                window.addEventListener('mouseup', onMouseUp, { once: true });
            // }
            mainElem.addEventListener('mousemove', onMouseMove);
        };

        window.addEventListener('mousedown', onMouseDown);

        return () => {
            window.removeEventListener('mousedown', onMouseDown);
            mainElem.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [childRef, divisionCount, divisions]);

    const renderContentInDivisions = (): ReactNode[] | null => {
        if (!childRef.current) return null;
        const mainElemRect = childRef.current.getBoundingClientRect();
        const width = mainElemRect.width;
        const height = mainElemRect.height;
        const divisionElements: ReactNode[] = [];

        const rowCount = Math.ceil(Math.sqrt(divisionCount));
        const colCount = Math.ceil(divisionCount / rowCount);

        const rowHeight = height / rowCount;
        const colWidth = width / colCount;

        const renderDivision = (division: number, key: number, isPreview: boolean = false) => {
            const row = Math.floor((division - 1) / colCount);
            const col = (division - 1) % colCount;

            let style: React.CSSProperties = {
                top: `${row * rowHeight}px`,
                left: `${col * colWidth}px`,
                width: `${colWidth}px`,
                height: `${rowHeight}px`,
                position: 'absolute',
                backgroundColor: isPreview ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)',
                border: '1px solid black',
                overflow: 'hidden'
            };

            return (
                <div key={key} style={style}>
                    {content}
                </div>
            );
        };

        divisions.forEach((division, index) => {
            divisionElements.push(renderDivision(division, index));
        });

        if (previewDivision !== null && !divisions.includes(previewDivision)) {
            divisionElements.push(renderDivision(previewDivision, divisions.length, true));
        }

        return divisionElements;
    };

    return [divisions, renderContentInDivisions];
};
