import { AppContext } from '@/context/indext';
import React, { useContext } from 'react';

const Color = () => {
    const context = useContext(AppContext);

  const handleChangeColor = (color: any) => {
      // if
        if (context?.state) {
            const elem = document.getElementById(context.state);
            if (!elem) return;
            elem.style.color = color;
        }
    };

    return (
        <div className='font-color flex justify-between w-[100%] mt-3'>
            <div className="styleLabel m-2 font-bold">
                Font Color
            </div>
            <select name="fontColor" id="fontColor"
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
            <input type="color" name="colorPicker" id="colorPicker"
                onChange={(e) => {
                    const value = e.target.value;
                    handleChangeColor(value);
                }}
            />
        </div>
    )
}
export default Color;
