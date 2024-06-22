import { AppContext } from '@/context/indext';
import React, { useContext, useState, useEffect } from 'react';

const Padding = () => {
    const context = useContext(AppContext);
    const [unit, setUnit] = useState('px');
    const [padding, setPadding] = useState('');

    const onChangePadding = () => {
        if (!context?.state) return;

        const elem = document.getElementById(context.state);
        if (!elem) return;
        elem.style.padding = `${padding}${unit}`;
    };

    useEffect(() => {
        onChangePadding();
    }, [padding, unit]);

    return (
        <div>
            <div className='padding flex justify-between w-[100%]'>
                <div className="styleLabel m-2 font-bold">
                    Padding
                </div>
                <div>
                    <input
                        type="number"
                        name="padding"
                        className='w-[100px] p-2'
                        value={padding}
                        onChange={(e) => setPadding(e.target.value)}
                    />
                    <select
                        name="padding-unit"
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

export default Padding;
