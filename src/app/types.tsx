import React, { createContext, useContext, useState, ReactNode } from 'react';

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
}

// const AppContext = createContext<AppContextType | undefined>(undefined);
