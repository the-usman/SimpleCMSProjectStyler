
import { AppContext } from '@/context/indext';
import React, { useContext } from 'react';

const BackgroundSize = () => {
    const context = useContext(AppContext);

    const handleBackgroundSizeChange = (size: any) => {
        if (context?.state) {
            const elem = document.getElementById(context.state);
            if (!elem) return;
            elem.style.backgroundSize = size;
        }
    };

    return (
        <div className='background-size flex justify-between w-[100%] mt-3'>
            <div className="styleLabel m-2 font-bold">
                Background Size
            </div>
            <select name="backgroundSize" id="backgroundSize"
                onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                        handleBackgroundSizeChange(value);
                    }
                }}
            >
                <option value="">Select Size</option>
                <option value="auto">Auto</option>
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
            </select>
        </div>
    )
}

export default BackgroundSize;
