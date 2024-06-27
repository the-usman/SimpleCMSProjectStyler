import React, { useContext, FC } from 'react';
import { element } from './types';
import { AppContext } from '@/context';
import DraggableResizableComponent from './DragResizerWarpper';

type H1props = {
    canvasRef: React.RefObject<HTMLDivElement>
}

const H1Component: FC<H1props> = ({ canvasRef }) => {
    const context = useContext(AppContext);
    const headings = context?.elements?.filter((elem) => elem.type === "heading")[0]?.elements;

    const onClick = (id: string) => {
        if (context?.setState) {
            context.setState(id);
            console.log(`Context updated with ID: ${id}`);
        }
    }

    return (
        <div>
            {headings?.map((heading: element) => (
                <div key={heading.id}>
                    <DraggableResizableComponent
                        id={heading.id as string}
                        conRef={canvasRef}
                        onClick={() => onClick(heading.id as string)}
                    >
                        <h1
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            style={{
                                outline: 'none',
                                overflow: 'auto',
                                width: "100%",
                                height: "100%",
                                opacity: 1,
                            }}
                            onFocus={() => {
                                const elem1 = document.getElementById(heading.id as string);
                                if (elem1 && elem1.innerText === heading.text && getComputedStyle(elem1).opacity === "1") {
                                    elem1.innerText = "";
                                    elem1.style.opacity = "1";
                                }
                            }}
                        >
                            {heading.text}
                        </h1>
                    </DraggableResizableComponent>
                </div>
            ))}
        </div>
    );
}

export default H1Component;
