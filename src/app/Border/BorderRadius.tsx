import { AppContext } from '@/context/indext';
import React, { useContext, useState, useEffect } from 'react';

const BorderRadius = () => {
    const context = useContext(AppContext);
    const [unit, setUnit] = useState('px');
    const [borderRadius, setBorderRadius] = useState('');

    const onChangeBorderRadius = () => {
        if (!context?.state) return;

        const elem = document.getElementById(context.state);
        if (!elem) return;
        elem.style.borderRadius = `${borderRadius}${unit}`;
    };

    useEffect(() => {
        onChangeBorderRadius();
    }, [borderRadius, unit]);

    return (
        <div>
            <div className='border-radius flex justify-between w-[100%]'>
                <div className="styleLabel m-2 font-bold">
                    Border Radius
                </div>
                <div>
                    <input
                        type="number"
                        name="border-radius"
                        className='w-[100px] p-2'
                        value={borderRadius}
                        onChange={(e) => setBorderRadius(e.target.value)}
                    />
                    <select
                        name="border-radius-unit"
                        className='text-lg p-2'
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        <option value="px">px</option>
                        <option value="%">%</option>
                        <option value="rem">rem</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default BorderRadius;
