import { AppContext } from '@/context';
import React, { useContext, useEffect, useState } from 'react';

const BackgroundSize = () => {
    const context = useContext(AppContext);
    const [size, setSize] = useState<string>('auto');

    const handleBackgroundSizeChange = (size: string) => {
        if (context?.state) {
            const elem = document.getElementById(context.state);
            if (!elem) return;
            elem.style.backgroundSize = size;
        }
    };

    useEffect(() => {
        handleBackgroundSizeChange(size);
    }, [size]);

    return (
        <div className='background-size flex justify-between w-[100%] mt-3'>
            <div className="styleLabel m-2 font-bold">
                Background Size
            </div>
            <select
                name="backgroundSize"
                id="backgroundSize"
                value={size}
                onChange={(e) => setSize(e.target.value)}
            >
                <option value="">Select Size</option>
                <option value="auto">Auto</option>
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
            </select>
        </div>
    );
};

export default BackgroundSize;
