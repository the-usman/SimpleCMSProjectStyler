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
                        className=''
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            style={{
                                outline: 'none',
                                overflow: 'auto',
                                width: "100%",
                                height: "100%",
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
