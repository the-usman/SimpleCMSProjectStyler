import { AppContext } from '@/context';
import React, { useContext, useState, useEffect } from 'react';

const BorderWidth = () => {
    const context = useContext(AppContext);
    const [unit, setUnit] = useState('px');
    const [borderWidth, setBorderWidth] = useState('1'); // default to 1px

    const onChangeBorderWidth = () => {
        if (!context?.state) return;

        const elem = document.getElementById(context.state);
        if (!elem) return;
        elem.style.borderWidth = `${borderWidth}${unit}`;
    };

    useEffect(() => {
        onChangeBorderWidth();
    }, [borderWidth, unit]);

    return (
        <div>
            <div className='border-width flex justify-between w-[100%]'>
                <div className="styleLabel m-2 font-bold">
                    Border Width
                </div>
                <div>
                    <input
                        type="number"
                        name="border-width"
                        className='w-[100px] p-2'
                        value={borderWidth}
                        onChange={(e) => setBorderWidth(e.target.value)}
                    />
                    <select
                        name="border-width-unit"
                        className='text-lg p-2'
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        <option value="px">px</option>
                        <option value="rem">rem</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default BorderWidth;
