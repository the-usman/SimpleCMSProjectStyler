import { AppContext } from '@/context';
import React, { useContext, useState, useEffect } from 'react';

const Width = () => {
    const context = useContext(AppContext);
    const [unit, setUnit] = useState<string>('px');
    const [width, setWidth] = useState<string>('100');

    const onChangeWidth = () => {
        if (!context?.state) return;

        const elem = document.getElementById(context.state);
        if (!elem) return;
        elem.style.width = `${width}${unit}`;
    };

    useEffect(() => {
        onChangeWidth();
    }, [width, unit]);

    return (
        <div>
            <div className='width flex justify-between w-[100%]'>
                <div className="styleLabel m-2 font-bold">
                    Width
                </div>
                <div>
                    <input
                        type="number"
                        name="width"
                        className='w-[100px] p-2'
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                    />
                    <select
                        name="width-unit"
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

export default Width;
