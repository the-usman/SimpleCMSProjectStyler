import { useEffect, useState, useRef, RefObject, ReactNode } from 'react';

type Division = { row: number; col: number; content: ReactNode };
type UseDivideableBoxResult = [Division[], () => ReactNode[] | null];

export const useDivideableBox = (
    childRef: RefObject<HTMLDivElement>,
    contentState: ReactNode,
    divisionConfig: number | number[][],
    isApplicable: boolean
): UseDivideableBoxResult => {
    if (!isApplicable) return [[], () => null];
    const newContentRef = useRef(contentState); 
    const [divisions, setDivisions] = useState<Division[]>([]);
    const [previewDivision, setPreviewDivision] = useState<{ row: number, col: number } | null>(null);

    const isNumberConfig = (config: number | number[][]): config is number => {
        return typeof config === 'number';
    };

    const getRowColWidths = (row: number): number[] => {
        if (isNumberConfig(divisionConfig)) {
            const count = divisionConfig;
            const rowCount = Math.ceil(Math.sqrt(count));
            const colCount = row < count % rowCount ? Math.ceil(count / rowCount) : Math.floor(count / rowCount);
            return new Array(colCount).fill(1 / colCount);
        } else {
            const rowConfig = divisionConfig[row];
            if (!rowConfig) return [];
            const total = rowConfig.reduce((sum, value) => sum + value, 0);
            return rowConfig.map(value => value / total);
        }
    };

    useEffect(() => {
        newContentRef.current = contentState; 
    }, [contentState]);

    useEffect(() => {
        const mainElem = childRef.current;
        if (!mainElem) {
            throw new Error('A reference to the element which is to be divided is required');
        }

        const detectDivision = (clientX: number, clientY: number): { row: number, col: number } | null => {
            const mainElemRect = mainElem.getBoundingClientRect();
            const width = mainElemRect.width;
            const height = mainElemRect.height;
            const x = clientX - mainElemRect.left;
            const y = clientY - mainElemRect.top;

            if (x < 0 || y < 0 || x > width || y > height) {
                return null;
            }

            const rowCount = isNumberConfig(divisionConfig) ? Math.ceil(Math.sqrt(divisionConfig)) : divisionConfig.length;
            const rowHeight = height / rowCount;

            const row = Math.floor(y / rowHeight);
            const colWidths = getRowColWidths(row);

            let cumulativeWidth = 0;
            for (let col = 0; col < colWidths.length; col++) {
                cumulativeWidth += colWidths[col] * width;
                if (x < cumulativeWidth) {
                    return { row, col };
                }
            }

            return null;
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

            if (division !== null && !divisions.some(d => d.row === division.row && d.col === division.col)) {
                setDivisions(prevDivisions => [...prevDivisions, { ...division, content: newContentRef.current }]);
            }
            setPreviewDivision(null);
            mainElem.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        const onMouseDown = (e: MouseEvent | TouchEvent) => {
            mainElem.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp, { once: true });
        };

        mainElem.addEventListener('mousedown', onMouseDown);

        return () => {
            mainElem.removeEventListener('mousedown', onMouseDown);
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

        const rowCount = isNumberConfig(divisionConfig) ? Math.ceil(Math.sqrt(divisionConfig)) : divisionConfig.length;
        const rowHeight = height / rowCount;

        divisions.forEach(({ row, col, content }, index) => {
            const colWidths = getRowColWidths(row);
            const colWidth = colWidths[col] * width;
            const left = colWidths.slice(0, col).reduce((acc, curr) => acc + curr * width, 0);

            const style: React.CSSProperties = {
                top: `${row * rowHeight}px`,
                left: `${left}px`,
                width: `${colWidth}px`,
                height: `${rowHeight}px`,
                position: 'absolute'
            };

            divisionElements.push(
                <div key={index} style={style}>
                    {content}
                </div>
            );
        });

        if (previewDivision !== null && !divisions.some(d => d.row === previewDivision.row && d.col === previewDivision.col)) {
            const colWidths = getRowColWidths(previewDivision.row);
            const colWidth = colWidths[previewDivision.col] * width;
            const left = colWidths.slice(0, previewDivision.col).reduce((acc, curr) => acc + curr * width, 0);

            const style: React.CSSProperties = {
                top: `${previewDivision.row * rowHeight}px`,
                left: `${left}px`,
                width: `${colWidth}px`,
                height: `${rowHeight}px`,
                position: 'absolute',
                backgroundColor: 'rgba(0, 255, 0, 0.3)',
                border: '1px solid black'
            };

            divisionElements.push(
                <div key={divisions.length} style={style}>
                    {newContentRef.current}
                </div>
            );
        }

        return divisionElements;
    };

    return [divisions, renderContentInDivisions];
};
