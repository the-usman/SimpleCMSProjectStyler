"use client"
import React, { useRef, useState, } from 'react';
import { BoundingBox } from 'framer-motion';
import H1Component from './H1Component';
import { position } from './types';

interface element {
  id?: string;
  text?: string;
}
export default function Home() {
  const [headings, setHeadings] = useState<element[]>([{}]);
  const [position, setPosition] = useState<position>({clientX: 0, clientY: 0})

  const createHeading = (): void => {
    const newHeading = {
      id: `h1_${headings.length + 1}`,
      text: 'Home',
    };
    setHeadings([...headings, newHeading]);
  };
  const canvasRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="home flex overflow-hidden">
      <div className="siderbar bg-slate-300 w-[300px] h-[100vh]">
        <button onClick={createHeading}>H1</button>
      </div>
      <div className="canvas" ref={canvasRef } style={{ overflow: 'hidden !important' , width: '1000px' }}>
        <H1Component headings={headings} canvasRef={canvasRef} />
      </div>
    </div>
  );
}
