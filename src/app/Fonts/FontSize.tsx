import { AppContext } from '@/context/indext';
import React, { useContext, useState, useEffect } from 'react';


const FontSize = () => {
    const context = useContext(AppContext);
    const [unit, setUnit] = useState('px');
    const [fontSize, setFontSize] = useState('');

    const onChangeFont = () => {
        if (!context?.state) return;
        
        const elem = document.getElementById(context.state);
        console.log("elem:", elem);
        if (!elem) return;
        elem.style.fontSize = `${fontSize}${unit}`;
    };

    useEffect(() => {
        onChangeFont();
    }, [fontSize, unit]); // Call onChangeFont whenever fontSize or unit changes

    return (
        <div>
            <div className='font-size flex justify-evenly w-[100%]'>
                <div className="styleLabel m-2 font-bold">
                    Font Size
                </div>
                <div>
                    <input
                        type="number"
                        name="font-size"
                        id=""
                        className='w-[100px] p-2'
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                    />
                    <select
                        name="font-size"
                        id=""
                        className='text-lg p-2'
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        <option value="px">px</option>
                        <option value="vw">vw</option>
                        <option value="%">%</option>
                        <option value="rem">rem</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FontSize;
