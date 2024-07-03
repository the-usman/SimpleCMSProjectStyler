"use client"
import React, {  useRef, useState, } from 'react';
import H1Component from './H1Component';
import { Elemento, element } from './types';
import TextComponent from './TextComponent';
import ImageComponent from './ImageComponent';
import Panel from './Panel';


export default function Home() {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="home flex overflow-hidden relative">
      
      <Panel />
      <div className="canvas" ref={canvasRef} style={{ overflow: 'hidden !important', width: '70%', minHeight: '100vh', position: 'relative', marginLeft: '30%' }}>
        <H1Component canvasRef={canvasRef} />
        <TextComponent canvasRef={canvasRef} />
        <ImageComponent canvasRef={canvasRef}/>
      </div>
    </div>
  );
}
