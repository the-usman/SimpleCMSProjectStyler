import { useEffect, useState, RefObject, ReactNode } from 'react';

type UseDivideableBoxResult = [number[], () => ReactNode[] | null];

export const useDivideableBox = (
    childRef: RefObject<HTMLDivElement>, 
    content: ReactNode, 
    divisionCount: number
): UseDivideableBoxResult => {
    const [divisions, setDivisions] = useState<number[]>([]);

    useEffect(() => {
        const mainElem = childRef.current;
        if (!mainElem) {
            throw new Error('A reference to the element which is to be divided is required');
        }

        const detectDivision = (clientX: number, clientY: number): number => {
            const mainElemRect = mainElem.getBoundingClientRect();
            const width = mainElemRect.width;
            const height = mainElemRect.height;
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
            setDivisions((prevDivisions) => {
                if (prevDivisions.includes(division)) {
                    return prevDivisions;
                }
                return [...prevDivisions, division];
            });
        };

        mainElem.addEventListener('mousemove', onMouseMove);

        return () => {
            mainElem.removeEventListener('mousemove', onMouseMove);
        };
    }, [childRef, content, divisionCount]);

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

        divisions.forEach((division, index) => {
            const row = Math.floor((division - 1) / colCount);
            const col = (division - 1) % colCount;

            let style: React.CSSProperties = {
                top: row * rowHeight,
                left: col * colWidth,
                width: colWidth,
                height: rowHeight,
                position: 'absolute',
                backgroundColor: 'rgba(255, 0, 0, 0.3)',
                border: '1px solid black'
            };

            divisionElements.push(
                (<div key={index} style={style}>
                    {content}
                </div>)
            );
        });

        return divisionElements;
    };

    return [divisions, renderContentInDivisions];
};
