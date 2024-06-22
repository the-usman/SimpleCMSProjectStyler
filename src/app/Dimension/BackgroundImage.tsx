import { AppContext } from '@/context/indext';
import React, { useContext, useState, useEffect } from 'react';

const BackgroundImage = () => {
    const context = useContext(AppContext);
    const [bgImage, setBgImage] = useState('');

    const onChangeBgImage = () => {
        if (!context?.state) return;

        const elem = document.getElementById(context.state);
        if (!elem) return;
        elem.style.backgroundImage = `url(${bgImage})`;
    };

    useEffect(() => {
        onChangeBgImage();
    }, [bgImage]);

    return (
        <div>
            <div className='background-image flex justify-between w-[100%]'>
                <div className="styleLabel m-2 font-bold">
                    Background Image
                </div>
                <div>
                    <input
                        type="text"
                        name="background-image"
                        className='w-[200px] p-2'
                        placeholder="Enter image URL"
                        value={bgImage}
                        onChange={(e) => setBgImage(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default BackgroundImage;
