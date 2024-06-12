"use client"
import React, { useEffect, useRef, useState, } from 'react';
import { BoundingBox } from 'framer-motion';
import H1Component from './H1Component';
import { Elemento, element } from './types';
import { AppWrapperProvider } from '@/context/indext';
import TextComponent from './TextComponent';


export default function Home() {
  const [headings, setHeadings] = useState<element[]>([{ id: "h1_0", text: "Enter Text" }]);
  const context = AppWrapperProvider();
  if (!context) {
    throw new Error('AppContext must be used within an AppProvider');
  }
  type Arg = {
    type: string;
    text?: string;
  }

  const { setElements, elements } = context;
  const updateElements = ({ type, text }: Arg): void => {
    if (setElements && elements) {
      let flag = true;
      setElements((prevElements: Elemento[]): Elemento[] => {
        console.log("Heelo");

        if (!flag) {
          return prevElements;
        }
        flag = !flag;

        const newElements = [...prevElements];
        const index = newElements.findIndex(element => element.type === type);
        // return newElements;
        if (index === -1) {
          newElements.push({ type: type, elements: [{ id: `${newElements.length}_0`, text: text || "Enter Text" }] });
          return newElements;
        }



        const elem = newElements[index].elements || [];
        elem.push({ id: `${index}_${elem.length}`, text: text || "Enter Text" });
        newElements[index].elements = elem;

        return newElements;
      });
      return;
    }
    return;
  };

  useEffect(() => {
    console.log(context);
  })

  const canvasRef = useRef<HTMLDivElement>(null);
  const handle = () => {
    updateElements({ type: "heading" });
    console.log("After");
    return;
  }
  return (
    <div className="home flex overflow-hidden">
      <div className="siderbar bg-slate-300 w-[300px] h-[100vh]">
        <button onClick={handle}>H1</button>
        <button onClick={() => updateElements({ type: "text" })}>Text</button>
      </div>
      <div className="canvas" ref={canvasRef} style={{ overflow: 'hidden !important', width: '1000px', height: 'auto' }}>
        <H1Component canvasRef={canvasRef} />
        <TextComponent canvasRef={canvasRef} />
      </div>
    </div>
  );
}
