
import { AppContext } from '@/context/indext';
import React, { useContext } from 'react';

const BackgroundPosition = () => {
    const context = useContext(AppContext);

    const handleBackgroundPositionChange = (position: any) => {
        if (context?.state) {
            const elem = document.getElementById(context.state);
            if (!elem) return;
            elem.style.backgroundPosition = position;
        }
    };

    return (
        <div className='background-position flex justify-between w-[100%] mt-3'>
            <div className="styleLabel m-2 font-bold">
                Background Position
            </div>
            <select name="backgroundPosition" id="backgroundPosition"
                onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                        handleBackgroundPositionChange(value);
                    }
                }}
            >
                <option value="">Select Position</option>
                <option value="left top">Left Top</option>
                <option value="left center">Left Center</option>
                <option value="left bottom">Left Bottom</option>
                <option value="right top">Right Top</option>
                <option value="right center">Right Center</option>
                <option value="right bottom">Right Bottom</option>
                <option value="center top">Center Top</option>
                <option value="center center">Center Center</option>
                <option value="center bottom">Center Bottom</option>
            </select>
        </div>
    )
}

export default BackgroundPosition;
