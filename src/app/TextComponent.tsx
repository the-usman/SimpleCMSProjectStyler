import React, { useContext, useRef } from 'react';
import { element } from './types';
import { AppContext } from '@/context/indext';
import DraggableResizableComponent from './DragResizerWarpper';

const TextComponent = ({ canvasRef }: { canvasRef: React.RefObject<HTMLDivElement> }) => {
  const context = useContext(AppContext);
  const headings = context?.elements?.filter((elem) => elem.type === "text")[0]?.elements;

  return (
    <div>
      {headings?.map((heading: element) => (
        <DraggableResizableComponent key={heading.id} id={heading.id as string} conRef={canvasRef}>
          <h1
            contentEditable="true"
            style={{
              fontSize: '18px',
              padding: '10px',
              outline: 'none',
              display: 'block',
              overflow: 'auto',
              width: "100%",
              height: "100%",
              borderRadius: '10px',
              msUserSelect: 'none',
              opacity: 1,
              position: 'relative'
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

export default TextComponent;
