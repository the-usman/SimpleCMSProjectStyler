import { AppContext } from '@/context/index';
import React, { useContext, useEffect, useState } from 'react';

const Color = () => {
    const context = useContext(AppContext);
    const [currentColor, setCurrentColor] = useState('');

    useEffect(() => {
        if (context?.state) {
            const elem = document.getElementById(context.state);
            if (elem) {
                const color = getComputedStyle(elem).color;
                setCurrentColor(color);
            }
        }
    }, [context?.state]);

    const handleChangeColor = (color: string) => {
        if (context?.state) {
            const elem = document.getElementById(context.state);
            if (!elem) return;
            elem.style.color = color;
            setCurrentColor(color);
        }
    };

    return (
        <div className='font-color flex justify-between w-[100%] mt-3'>
            <div className="styleLabel m-2 font-bold">
                Font Color
            </div>
            <select
                name="fontColor"
                id="fontColor"
                value={currentColor}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                        handleChangeColor(value);
                    }
                }}
            >
                <option value="">Select Color</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
            </select>
            <input
                type="color"
                name="colorPicker"
                id="colorPicker"
                value={currentColor}
                onChange={(e) => handleChangeColor(e.target.value)}
            />
        </div>
    );
};

export default Color;
