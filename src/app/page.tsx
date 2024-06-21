"use client"
import React, {  useRef, useState, } from 'react';
import H1Component from './H1Component';
import { Elemento, element } from './types';
import TextComponent from './TextComponent';
import ImageComponent from './ImageComponent';
import Panel from './Panel';


export default function Home() {
  const [headings, setHeadings] = useState<element[]>([{ id: "h1_0", text: "Enter Text" }]);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="home flex overflow-hidden">
      <Panel />
      <div className="canvas" ref={canvasRef} style={{ overflow: 'hidden !important', width: '75%', height: 'auto', position: 'relative' }}>
        <H1Component canvasRef={canvasRef} />
        <TextComponent canvasRef={canvasRef} />
        <ImageComponent canvasRef={canvasRef}/>
      </div>
    </div>
  );
}
