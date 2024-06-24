
import { AppContext } from '@/context';
import React, { useContext } from 'react';

const Animation = () => {
    const context = useContext(AppContext);

    const handleAnimationChange = (animation: any) => {
        if (context?.state) {
            const elem = document.getElementById(context.state);
            if (!elem) return;

            const animationClasses = [
                'fadeIn', 'fadeOut', 'slideIn', 'slideOut', 'zoomIn', 'zoomOut', 'rotate', 'bounce', 'flip',
                'shake', 'blur', 'spin', 'swing', 'hinge', 'rubberBand', 'flash', 'wobble', 'pulse', 'tada', 'jello'
            ];
            elem.classList.remove(...animationClasses);

            if (animation) {
                elem.classList.add(animation);
            }
        }
    };

    return (
        <div className='animation-type flex justify-between w-[100%] mt-3'>
            <div className="styleLabel m-2 font-bold">
                Animation Type
            </div>
            <select name="animationType" id="animationType"
                onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                        handleAnimationChange(value);
                    }
                }}
            >
                <option value="">Select Animation</option>
                <option value="fadeIn">Fade In</option>
                <option value="fadeOut">Fade Out</option>
                <option value="slideIn">Slide In</option>
                <option value="slideOut">Slide Out</option>
                <option value="zoomIn">Zoom In</option>
                <option value="zoomOut">Zoom Out</option>
                <option value="rotate">Rotate</option>
                <option value="bounce">Bounce</option>
                <option value="flip">Flip</option>
                <option value="shake">Shake</option>
                <option value="blur">Blur</option>
                <option value="spin">Spin</option>
                <option value="swing">Swing</option>
                <option value="hinge">Hinge</option>
                <option value="rubberBand">Rubber Band</option>
                <option value="flash">Flash</option>
                <option value="wobble">Wobble</option>
                <option value="pulse">Pulse</option>
                <option value="tada">Tada</option>
                <option value="jello">Jello</option>
            </select>
        </div>
    )
}

export default Animation;
