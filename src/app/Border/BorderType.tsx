import { AppContext } from '@/context';
import React, { useContext, useState, useEffect } from 'react';

const BorderType = () => {
    const context = useContext(AppContext);
    const [borderType, setBorderType] = useState(''); 
    const onChangeBorderType = () => {
        if (!context?.state) return;

        const elem = document.getElementById(context.state);
        if (!elem) return;
        elem.style.border = borderType;
    };

    useEffect(() => {
        onChangeBorderType();
    }, [borderType]);

    return (
        <div>
            <div className='border-type flex justify-between w-[100%]'>
                <div className="styleLabel m-2 font-bold">
                    Border Type
                </div>
                <div>
                    <input
                        type="text"
                        name="border-type"
                        className='w-[200px] p-2'
                        value={borderType}
                        onChange={(e) => setBorderType(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default BorderType;
