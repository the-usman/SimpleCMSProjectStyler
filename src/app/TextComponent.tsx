import React, { useContext, useRef } from 'react';
import { element } from './types';
import { AppContext } from '@/context';
import DraggableResizableComponent from './DragResizerWarpper';

const TextComponent = ({ canvasRef }: { canvasRef: React.RefObject<HTMLDivElement> }) => {
  const context = useContext(AppContext);
  const headings = context?.elements?.filter((elem) => elem.type === "text")[0]?.elements;
  const onClick = (id: string) => {
    if (context?.setState) {
      context?.setState(id);
      console.log(context);
    }

  }

  return (
    <div>
      {headings?.map((heading: element) => (
        <div key={heading.id}>
        <DraggableResizableComponent key={heading.id} id={heading.id as string} conRef={canvasRef}
          onClick={()=>onClick(heading.id as string)}
        >
          <p
            contentEditable="true"
            style={{
              padding: '10px',
              outline: 'none',
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
          </p>
          </DraggableResizableComponent>
          </div>
      ))}
    </div>
  );
}

export default TextComponent;
