import { AppContext } from '@/context/index';
import React, { useContext, useState, useEffect } from 'react';

const TextDecoration = () => {
    const context = useContext(AppContext);
    const [textDecoration, setTextDecoration] = useState('');

    useEffect(() => {
        if (context?.state) {
            const elem = document.getElementById(context.state);
            if (elem) {
                const currentDecoration = getComputedStyle(elem).textDecoration;
                setTextDecoration(currentDecoration);
            }
        }
    }, [context?.state]);

    const onChangeTextDecoration = () => {
        if (!context?.state) return;

        const elem = document.getElementById(context.state);
        if (!elem) return;
        elem.style.textDecoration = textDecoration;
    };

    useEffect(() => {
        onChangeTextDecoration();
    }, [textDecoration]);

    return (
        <div>
            <div className='text-decoration flex justify-between w-[100%]'>
                <div className="styleLabel m-2 font-bold">
                    Text Decoration
                </div>
                <div>
                    <select
                        name="text-decoration"
                        className='text-lg p-2'
                        value={textDecoration}
                        onChange={(e) => setTextDecoration(e.target.value)}
                    >
                        <option value="none">None</option>
                        <option value="underline">Underline</option>
                        <option value="line-through">Line-through</option>
                        <option value="overline">Overline</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TextDecoration;
