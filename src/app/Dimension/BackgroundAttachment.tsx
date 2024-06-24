// import { AppContext } from '@/context/index';
import { AppContext } from '@/context';
import React, { useContext, useEffect, useState } from 'react';

const BackgroundAttachment = () => {
    const context = useContext(AppContext);
    const [defaultAttachment, setDefaultAttachment] = useState('');

    useEffect(() => {
        if (context?.state) {
            const elem = document.getElementById(context.state);
            if (elem) {
                const currentAttachment = getComputedStyle(elem).backgroundAttachment;
                setDefaultAttachment(currentAttachment);
            }
        }
    }, [context?.state]);

    const handleBackgroundAttachmentChange = (attachment: string) => {
        if (context?.state) {
            const elem = document.getElementById(context.state);
            if (!elem) return;
            elem.style.backgroundAttachment = attachment;
        }
    };

    return (
        <div className='background-attachment flex justify-between w-[100%] mt-3'>
            <div className="styleLabel m-2 font-bold">
                Background Attachment
            </div>
            <select
                name="backgroundAttachment"
                id="backgroundAttachment"
                value={defaultAttachment}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                        handleBackgroundAttachmentChange(value);
                        setDefaultAttachment(value); 
                    }
                }}
            >
                <option value="">Select Attachment</option>
                <option value="scroll">Scroll</option>
                <option value="fixed">Fixed</option>
                <option value="local">Local</option>
            </select>
        </div>
    );
}

export default BackgroundAttachment
