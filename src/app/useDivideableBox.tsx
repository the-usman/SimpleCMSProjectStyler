import { useEffect, useState, RefObject, ReactNode } from 'react';

type UseDivideableBoxResult = [number[][], () => ReactNode[] | null];

export const useDivideableBox = (
    childRef: RefObject<HTMLDivElement>,
    content: ReactNode,
    divisionConfig: number | number[][]
): UseDivideableBoxResult => {
    const [divisions, setDivisions] = useState<number[][]>([]);
    const [previewDivision, setPreviewDivision] = useState<{ row: number, col: number } | null>(null);

    const isNumberConfig = (config: number | number[][]): config is number => {
        return typeof config === 'number';
    };

    const getRowColCount = (): { rowCount: number, colCount: number } => {
        if (isNumberConfig(divisionConfig)) {
            const count = divisionConfig;
            const rowCount = Math.floor(Math.sqrt(count));
            const colCount = Math.ceil(count / rowCount);
            return { rowCount, colCount };
        } else {
            const rowCount = divisionConfig.length;
            const colCount = Math.max(...divisionConfig.map(row => row.length));
            return { rowCount, colCount };
        }
    };

    const detectDivision = (clientX: number, clientY: number, rowCount: number, colCount: number): { row: number, col: number } | null => {
        const mainElem = childRef.current;
        if (!mainElem) return null;

        const mainElemRect = mainElem.getBoundingClientRect();
        const width = mainElemRect.width;
        const height = mainElemRect.height;
        const x = clientX - mainElemRect.left;
        const y = clientY - mainElemRect.top;

        if (x < 0 || y < 0 || x > width || y > height) {
            return null;
        }

        const rowHeight = height / rowCount;
        const colWidth = width / colCount;

        const row = Math.floor(y / rowHeight);
        const col = Math.floor(x / colWidth);

        return { row, col };
    };

    useEffect(() => {
        const mainElem = childRef.current;
        if (!mainElem) {
            throw new Error('A reference to the element which is to be divided is required');
        }

        const onMouseMove = (e: MouseEvent | TouchEvent) => {
            let clientX: number, clientY: number;
            if (e instanceof MouseEvent) {
                clientX = e.clientX;
                clientY = e.clientY;
            } else {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }

            const { rowCount, colCount } = getRowColCount();
            const division = detectDivision(clientX, clientY, rowCount, colCount);
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

            const { rowCount, colCount } = getRowColCount();
            const division = detectDivision(clientX, clientY, rowCount, colCount);

            if (division !== null && !divisions.some(d => d[0] === division.row && d[1] === division.col)) {
                setDivisions(prevDivisions => [...prevDivisions, [division.row, division.col]]);
            }
            setPreviewDivision(null);
            mainElem.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        const onMouseDown = (e: MouseEvent | TouchEvent) => {
            mainElem.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp, { once: true });
        };

        window.addEventListener('mousedown', onMouseDown);

        return () => {
            window.removeEventListener('mousedown', onMouseDown);
            mainElem.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [childRef, divisionConfig, divisions]);

    const renderContentInDivisions = (): ReactNode[] | null => {
        if (!childRef.current) return null;
        const mainElemRect = childRef.current.getBoundingClientRect();
        const width = mainElemRect.width;
        const height = mainElemRect.height;
        const divisionElements: ReactNode[] = [];

        const { rowCount, colCount } = getRowColCount();
        const rowHeight = height / rowCount;
        const colWidth = width / colCount;

        divisions.forEach(([row, col], index) => {
            const style: React.CSSProperties = {
                top: `${row * rowHeight}px`,
                left: `${col * colWidth}px`,
                width: `${colWidth}px`,
                height: `${rowHeight}px`,
                position: 'absolute',
                backgroundColor: 'rgba(255, 0, 0, 0.3)',
                border: '1px solid black'
            };

            divisionElements.push(
                <div key={index} style={style}>
                    {content}
                </div>
            );
        });

        if (previewDivision !== null && !divisions.some(d => d[0] === previewDivision.row && d[1] === previewDivision.col)) {
            const style: React.CSSProperties = {
                top: `${previewDivision.row * rowHeight}px`,
                left: `${previewDivision.col * colWidth}px`,
                width: `${colWidth}px`,
                height: `${rowHeight}px`,
                position: 'absolute',
                backgroundColor: 'rgba(0, 255, 0, 0.3)',
                border: '1px solid black'
            };

            divisionElements.push(
                <div key={divisions.length} style={style}>
                    {content}
                </div>
            );
        }

        return divisionElements;
    };

    return [divisions, renderContentInDivisions];
};
