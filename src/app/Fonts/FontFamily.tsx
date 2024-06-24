import { AppContext } from '@/context/index';
import React, { useContext, useEffect, useState } from 'react';

const FontFamily = () => {
    const context = useContext(AppContext);
    const [currentFontFamily, setCurrentFontFamily] = useState('');

    useEffect(() => {
        if (context?.state) {
            const elem = document.getElementById(context.state);
            if (elem) {
                const fontFamily = getComputedStyle(elem).fontFamily;
                setCurrentFontFamily(fontFamily);
            }
        }
    }, [context?.state]);

    const handleFontFamilyChange = (fontFamily: string) => {
        if (context?.state) {
            const elem = document.getElementById(context.state);
            if (!elem) return;
            elem.style.fontFamily = fontFamily;
            setCurrentFontFamily(fontFamily);
        }
    };

    return (
        <div className='font-family flex justify-between w-[100%] mt-3'>
            <div className="styleLabel m-2 font-bold">
                Font Family
            </div>
            <select
                name="fontFamily"
                id="fontFamily"
                value={currentFontFamily}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                        handleFontFamilyChange(value);
                    }
                }}
            >
                <option value="">Select Font Family</option>
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Lucida Console', monospace">Lucida Console</option>
                <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
                <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                <option value="Verdana, sans-serif">Verdana</option>
            </select>
        </div>
    );
};

export default FontFamily;
