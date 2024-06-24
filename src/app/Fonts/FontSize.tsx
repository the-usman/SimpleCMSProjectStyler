import { AppContext } from '@/context/index';
import React, { useContext, useState, useEffect } from 'react';

const FontSize = () => {
    const context = useContext(AppContext);
    const [unit, setUnit] = useState<string>('px');
    const [fontSize, setFontSize] = useState<string>('');

    useEffect(() => {
        const elem = context?.state ? document.getElementById(context.state) : null;
        if (elem) {
            const currentFontSize = getComputedStyle(elem).fontSize;
            const size = currentFontSize.match(/\d+/)?.[0] || '';
            const unit = currentFontSize.match(/[a-z]+/)?.[0] || 'px';
            setFontSize(size);
            setUnit(unit);
        }
    }, [context?.state]);

    useEffect(() => {
        const elem = context?.state ? document.getElementById(context.state) : null;
        if (elem) {
            elem.style.fontSize = `${fontSize}${unit}`;
        }
    }, [fontSize, unit, context?.state]);

    return (
        <div>
            <div className='font-size flex justify-between w-[100%]'>
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
