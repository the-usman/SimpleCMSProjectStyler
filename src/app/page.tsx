"use client"
import React, {  useRef, useState, } from 'react';
import H1Component from './H1Component';
import { Elemento, element } from './types';
import TextComponent from './TextComponent';
import ImageComponent from './ImageComponent';
import Panel from './Panel';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 


export default function Home() {
  const [headings, setHeadings] = useState<element[]>([{ id: "h1_0", text: "Enter Text" }]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];
  
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
