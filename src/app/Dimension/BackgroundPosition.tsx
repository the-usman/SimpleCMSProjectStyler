import { AppContext } from '@/context';
import React, { useContext, useEffect, useState } from 'react';

const BackgroundPosition = () => {
    const context = useContext(AppContext);
    const [position, setPosition] = useState<string>('center center');

    const handleBackgroundPositionChange = (position: string) => {
        if (context?.state) {
            const elem = document.getElementById(context.state);
            if (!elem) return;
            elem.style.backgroundPosition = position;
        }
    };

    useEffect(() => {
        handleBackgroundPositionChange(position);
    }, [position]);

    return (
        <div className='background-position flex justify-between w-[100%] mt-3'>
            <div className="styleLabel m-2 font-bold">
                Background Position
            </div>
            <select
                name="backgroundPosition"
                id="backgroundPosition"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
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
    );
};

export default BackgroundPosition;
