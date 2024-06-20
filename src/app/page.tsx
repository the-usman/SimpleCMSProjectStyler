"use client"
import React, { useEffect, useRef, useState, } from 'react';
import H1Component from './H1Component';
import { Elemento, element } from './types';
import { AppWrapperProvider } from '@/context/indext';
import TextComponent from './TextComponent';
import Image from 'next/image';
import Icon from './Icon';


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


  const canvasRef = useRef<HTMLDivElement>(null);
  const handle = (type: string) => {
    updateElements({ type: type });
  }
  return (
    <div className="home flex overflow-hidden">
      <div className="siderbar bg-slate-300 w-[25%] h-[100vh]">
        <div className="icons flex justify-evenly items-center gap-2 p-2">
          <Icon text='Heading' src='/heading.png' onClick={() => handle('heading')} ></Icon>
          <Icon text='text' src='/text.png' onClick={() => handle('text')} ></Icon>
          {/* <Icon text='Image' src='/text.png' ></Icon> */}
        </div>
      </div>
      <div className="canvas" ref={canvasRef} style={{ overflow: 'hidden !important', width: '75%', height: 'auto', position: 'relative' }}>
        <H1Component canvasRef={canvasRef} />
        <TextComponent canvasRef={canvasRef} />
      </div>
    </div>
  );
}
