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

    const onClick = (id: string) => {
        if (context?.setState) {
            context?.setState(id);
            console.log(context);
        }

    }



    return (
        <div >
            {headings?.map((heading: element) => (
                <DraggableResizableComponent id={heading.id as string} conRef={canvasRef}
                    onClick={() => onClick(heading.id as string)}
                    key={heading.id}
                >
                    <h1
                        // id={heading.id}
                        contentEditable="true"
                        style={{
                            // fontSize: '18px',
                            // padding: '10px',
                            outline: 'none',
                            // display: 'block',
                            overflow: 'auto',
                            width: "100%",
                            height: "100%",
                            opacity: 1,
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

