import { AppContext } from '@/context/indext';
import React, { useContext, useState, useEffect } from 'react';

const BorderColor = () => {
    const context = useContext(AppContext);
    const [borderColor, setBorderColor] = useState('');

    const onChangeBorderColor = () => {
        if (!context?.state) return;

        const elem = document.getElementById(context.state);
        if (!elem) return;
        elem.style.borderColor = borderColor;
    };

    useEffect(() => {
        onChangeBorderColor();
    }, [borderColor]);

    return (
        <div>
            <div className='border-color flex justify-between w-[100%]'>
                <div className="styleLabel m-2 font-bold">
                    Border Color
                </div>
                <div>
                    <input
                        type="color"
                        name="border-color"
                        className='p-2'
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default BorderColor;
