import { AppContext } from '@/context';
import React, { useContext, useState, useEffect } from 'react';

const BorderAnimation = () => {
    const context = useContext(AppContext);
    const [animation, setAnimation] = useState<string>('');

    const handleBorderAnimationChange = (animation: string) => {
        if (context?.state) {
            const elem = document.getElementById(context.state);
            if (!elem) return;

            const animationClasses = [
                'border-expand', 'border-shrink', 'border-pulsate', 'border-rotate', 'border-flash', 'border-dash', 'border-gradient', 'border-glow', 'border-wave',
                'border-slide', 'border-bounce', 'border-fade', 'border-spread', 'border-flicker', 'border-ripple'
            ];
            elem.classList.remove(...animationClasses);

            if (animation) {
                elem.classList.add(animation);
            }
        }
    };

    useEffect(() => {
        handleBorderAnimationChange(animation);
    }, [animation]);

    return (
        <div className='border-animation flex justify-between w-[100%] mt-3'>
            <div className="styleLabel m-2 font-bold">
                Border Animation
            </div>
            <select
                name="borderAnimation"
                id="borderAnimation"
                value={animation}
                onChange={(e) => setAnimation(e.target.value)}
            >
                <option value="">Select Animation</option>
                <option value="border-expand">Border Expand</option>
                <option value="border-shrink">Border Shrink</option>
                <option value="border-pulsate">Border Pulsate</option>
                <option value="border-rotate">Border Rotate</option>
                <option value="border-flash">Border Flash</option>
                <option value="border-dash">Border Dash</option>
                <option value="border-gradient">Border Gradient</option>
                <option value="border-glow">Border Glow</option>
                <option value="border-wave">Border Wave</option>
                <option value="border-slide">Border Slide</option>
                <option value="border-bounce">Border Bounce</option>
                <option value="border-fade">Border Fade</option>
                <option value="border-spread">Border Spread</option>
                <option value="border-flicker">Border Flicker</option>
                <option value="border-ripple">Border Ripple</option>
            </select>
        </div>
    );
}

export default BorderAnimation;
