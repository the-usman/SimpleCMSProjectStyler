import { AppContext } from '@/context';
import React, { useContext, useState, useEffect } from 'react';

const Height = () => {
    const context = useContext(AppContext);
    const [unit, setUnit] = useState<string>('px');
    const [height, setHeight] = useState<string>('100');

    const onChangeHeight = () => {
        if (!context?.state) return;

        const elem = document.getElementById(context.state);
        if (!elem) return;
        elem.style.height = `${height}${unit}`;
    };

    useEffect(() => {
        onChangeHeight();
    }, [height, unit]);

    return (
        <div>
            <div className='height flex justify-between w-[100%]'>
                <div className="styleLabel m-2 font-bold">
                    Height
                </div>
                <div>
                    <input
                        type="number"
                        name="height"
                        className='w-[100px] p-2'
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                    <select
                        name="height-unit"
                        className='text-lg p-2'
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        <option value="px">px</option>
                        <option value="vh">vh</option>
                        <option value="%">%</option>
                        <option value="rem">rem</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Height;
