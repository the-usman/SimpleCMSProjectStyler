import React, { useContext, useEffect, useRef, useState, } from 'react';
import { Elemento, element } from './types';
import { AppContext } from '@/context';
import Icon from './Icon';
import Styler from './Styler';
import Advance from './Advance';


const Panel = () => {
    const context = useContext(AppContext);
    
    if (!context) {
        throw new Error('AppContext must be used within an AppProvider');
    }
    type Arg = {
        type: string;
        text?: string;
    }





    const { setElements, elements, state, dragLock, setDragLock } = context;

    const updateElements = ({ type, text }: Arg): void => {
        if (setElements && elements) {
            let flag = true;
            console.log("state", state);
            setElements((prevElements: Elemento[]): Elemento[] => {
                console.log("Heelo");

                if (!flag) {
                    return prevElements;
                }
                flag = !flag;

                const newElements = [...prevElements];
                const index = newElements.findIndex(element => element.type === type);
                // return newElements;
                if (index === -1) {
                    newElements.push({ type: type, elements: [{ id: `${newElements.length}_0`, text: text || "Enter Text" }] });
                    console.log(newElements);
                    return newElements;
                }



                const elem = newElements[index].elements || [];
                elem.push({ id: `${index}_${elem.length}`, text: text || "Enter Text" });
                newElements[index].elements = elem;

                return newElements;
            });
            return;
        }
        return;
    };
    const handle = (type: string) => {
        updateElements({ type: type });
    }



    const tabs = ['Components', 'Styling', 'Advance'];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    useEffect(() => {
        tabs.forEach(element => {
            const box = document.getElementById(element);
            if (!box) return;
            if (element !== activeTab) {
                box.style.display = 'none';
            }
            else {
                box.style.display = 'flex';
            }
        });

    }, [activeTab]);

    


    


    return (
        <div className='w-[30%]' >
            
            <div className="siderbar bg-slate-300 w-[100%] h-[100vh] flex flex-col justify-between overflow-auto">

                <div className="tabs flex">

                    {tabs.map((tab, index) => <div key={index} className={`w-[50%] p-4 hover:bg-white transition-all duration-500 cursor-pointer rounded-full ${activeTab === tab && 'bg-white'}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </div>)
                    }

                </div>

                {/* <div className='text-center text-3xl font-bold my-20'>Welcome to {activeTab}</div> */}
                <div className="icons flex justify-evenly items-center gap-2 p-2 flex-wrap" id='Components'>
                    <Icon text='Heading' src='/heading.png' onClick={() => handle('heading')} ></Icon>
                    <Icon text='text' src='/text.png' onClick={() => handle('text')} ></Icon>
                    <Icon text='Image' src='/image.png' onClick={() => handle('image')} ></Icon>
                    <Icon text='Videos' src='/video.png' onClick={() => handle('video')} ></Icon>
                </div>
                        {activeTab === 'Styling' && <Styler/>}
                    
                <Advance />
            </div>
        </div>
    )
}

export default Panel
