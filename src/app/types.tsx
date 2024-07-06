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




export interface IconType {

}

export interface DivideableBoxProps {
    children: React.ReactNode
    childRef: any;
    id?: string;
    content: React.ReactNode;
    isApplicable: boolean;
    divisionCount: number | number[][];
}

export type Division =
    {
        row: number; col: number; content: React.ReactNode
    };


export type UseDivideableBoxResult =
[number[], () => React.ReactNode[] | null];

export interface useDivideableArg {
    childRef: RefObject<HTMLDivElement>;
    contentState: React.ReactNode;
    divisionConfig: number | number[][];
}
