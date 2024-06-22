import { AppContext } from '@/context/indext';
import React, { useContext, useState, useEffect } from 'react';

const BorderStyle = () => {
    const context = useContext(AppContext);
    const [borderStyle, setBorderStyle] = useState('');

    const onChangeBorderStyle = () => {
        if (!context?.state) return;

        const elem = document.getElementById(context.state);
        if (!elem) return;
        elem.style.borderStyle = borderStyle;
    };

    useEffect(() => {
        onChangeBorderStyle();
    }, [borderStyle]);

    return (
        <div>
            <div className='border-style flex justify-between w-[100%]'>
                <div className="styleLabel m-2 font-bold">
                    Border Style
                </div>
                <div>
                    <select
                        name="border-style"
                        className='text-lg p-2'
                        value={borderStyle}
                        onChange={(e) => setBorderStyle(e.target.value)}
                    >
                        <option value="none">None</option>
                        <option value="solid">Solid</option>
                        <option value="dotted">Dotted</option>
                        <option value="dashed">Dashed</option>
                        <option value="double">Double</option>
                        <option value="groove">Groove</option>
                        <option value="ridge">Ridge</option>
                        <option value="inset">Inset</option>
                        <option value="outset">Outset</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default BorderStyle;
