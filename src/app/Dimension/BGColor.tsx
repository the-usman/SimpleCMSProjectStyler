import { AppContext } from '@/context';
import React, { useContext, useState, useEffect } from 'react';

const BgColor = () => {
    const context = useContext(AppContext);
    const [bgColor, setBgColor] = useState<string>('#ffffff');

    const onChangeBgColor = () => {
        if (!context?.state) return;

        const elem = document.getElementById(context.state);
        if (!elem) return;
        elem.style.backgroundColor = bgColor;
    };

    useEffect(() => {
        onChangeBgColor();
    }, [bgColor]);

    return (
        <div>
            <div className='bg-color flex justify-between w-[100%]'>
                <div className="styleLabel m-2 font-bold">
                    Background Color
                </div>
                <div>
                    <input
                        type="color"
                        name="bg-color"
                        className='p-2'
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default BgColor;
