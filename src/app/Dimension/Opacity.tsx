import { AppContext } from '@/context';
import React, { useContext, useState, useEffect } from 'react';

const Opacity = () => {
    const context = useContext(AppContext);
    const [opacity, setOpacity] = useState<number>(1);

    const onChangeOpacity = () => {
        if (!context?.state) return;

        const elem = document.getElementById(context.state);
        if (!elem) return;
        elem.style.opacity = opacity.toString();
    };

    useEffect(() => {
        onChangeOpacity();
    }, [opacity]);

    return (
        <div>
            <div className='opacity flex justify-between w-[100%]'>
                <div className="styleLabel m-2 font-bold">
                    Opacity
                </div>
                <div>
                    <input
                        type="range"
                        name="opacity"
                        min="0"
                        max="1"
                        step="0.01"
                        className='p-2'
                        value={opacity}
                        onChange={(e) => setOpacity(parseFloat(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
};

export default Opacity;
