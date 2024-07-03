import React, { RefObject } from 'react';

export interface element {
    id?: string;
    text?: string;
}

export interface Elemento {
    type?: string;
    elements?: element[];
}

export interface Context {
    state?: string;
    setState?: (state: string) => void;
    elements?: Elemento[];
    setElements?: (elements: Elemento[] | ((prevElements: Elemento[]) => Elemento[])) => void;
    isDragging?: boolean;
    setIsDragging: (isDragging: boolean) => void;
    dragableComponent?: string;
    setDargableComponent: (dragComponent: string) => void;
    images?: { [key: string]: string };
    setImages?: (elements: { [key: string]: string } | ((prevImages: { [key: string]: string }) => { [key: string]: string })) => void;
    dragLock?: boolean;
    setDragLock?: (dragLock: boolean) => void;
    videos?: { [key: string]: string };
    setVideos?: (elements: { [key: string]: string } | ((prevImages: { [key: string]: string }) => { [key: string]: string })) => void;
}



export interface DragResizeProps {
    children: React.ReactNode,
    id: string;
    conRef?: any;
    onClick?: () => void;
    autoHeight?: boolean;
}


export interface VideoCompoent {
    canvasRef: RefObject<HTMLDivElement>;
    uploadVideo: (file: File | null) => Promise<string>;
}

export interface IconType {

}

