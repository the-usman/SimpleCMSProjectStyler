import React, { useState, useRef, useEffect, useContext, FC } from 'react';

import { element } from './types';
import { AppContext } from '@/context/indext';
import DraggableResizableComponent from './DragResizerWarpper';

type H1props = {
    canvasRef: React.RefObject<HTMLDivElement>
}

const H1Component: FC<H1props> = ({ canvasRef }) => {
    const context = useContext(AppContext);
    const headings = context?.elements?.filter((elem) => elem.type === "heading")[0]?.elements;



    return (
        <div >
            {headings?.map((heading: element) => (
                <DraggableResizableComponent id={heading.id as string} conRef={canvasRef}>
                    <h1
                        key={heading.id}
                        id={heading.id}
                        contentEditable="true"
                        style={{
                            fontSize: '28px',
                            padding: '10px',
                            height:'100%',
                            opacity: 0.5
                        }}

                        onFocus={(e) => {
                            const elem1 = document.getElementById(heading.id as string);
                            if (!elem1) return;
                            if (elem1.innerText !== heading.text && getComputedStyle(elem1).opacity === "1") return;
                            elem1.innerText = ""
                            elem1.style.opacity = "1";
                        }}
                    >
                        {heading.text}
                    </h1>
                </DraggableResizableComponent>
            ))}
        </div>
    );
}

export default H1Component;

