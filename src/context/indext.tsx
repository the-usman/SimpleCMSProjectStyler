"use client";

import { Elemento, element } from "@/app/types";
import React, { createContext, useContext, useState } from "react";
import { Context } from "@/app/types";

export const AppContext = createContext<Context | undefined>(undefined);

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<string>();
    const [elements, setElements] = useState<Elemento[]>([]);

    const value: Context = {
        state,
        setState,
        elements,
        setElements,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};


export function AppWrapperProvider() {
    return useContext(AppContext);
}