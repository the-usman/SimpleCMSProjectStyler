
import { AppWrapperProvider } from '@/context/indext';
import React, { useEffect, useState } from 'react';
type classElem = {
    elem?: string,
    styles?: string,
}

const Advance = () => {
    const [styles, setStyles] = useState(``);
    const context = AppWrapperProvider();

    if (!context)
        throw new Error('No context provided');
    const { state } = context;


    const onChangeStyle = (e: any) => {
        setStyles(e.target.innerText);
    }
    const AddUpdateStyles = (element: string, stylesFull: string, styles: string): string => {
        let returnStyles = stylesFull;
        const styleBlocks = styles.split('}').slice(0, -1); 
        styleBlocks.forEach((block) => {
            const trimmedBlock = block.trim();
            if (trimmedBlock) {
                const [selectorPart, stylePart] = trimmedBlock.split('{');
                const selector = selectorPart.trim();
                const styleContent = stylePart.trim();
                const fullSelector = `${element}${selector}`;
                
                const pattern = new RegExp(`${fullSelector}\\s*{[^}]*}\\s*`, 'gi');
                
                returnStyles = returnStyles.replace(pattern, '').trim();
                
                const newStyles = `${fullSelector} { ${styleContent} } `;
                returnStyles = `${returnStyles}\n${newStyles}`;
            }
        });
        return returnStyles;
    };

    const styleContent = () => {
        if (!state) {
            alert("No element Selected")
        }
        const cssStyle = document.getElementById('css')?.innerText || '';
        let styleElement = document.getElementsByTagName('style')[0];
        if (!styleElement) {
            styleElement = document.createElement('style');
            document.head.appendChild(styleElement);
        }
        console.log("Style Element:  ", styleElement)
        console.log("style is ", cssStyle);
        let styleContent = styleElement.innerHTML;
        styleContent = AddUpdateStyles(`.mainDivResizer_${state}`, styleContent, cssStyle);

        styleElement.innerHTML = styleContent;
    }



    return (
        <div>
            <div id='Advance' className='flex flex-col'>

                <div contentEditable={true} className='h-[300px] overflow-auto'
                    id='css'
                >


                </div>
                <button onClick={styleContent}>Style NOW</button>
                <div onClick={() => {

                }}>
                    See classes on this element
                    <br />
                    <br />
                </div>
                <div onClick={() => {

                }}>
                    See All existed classes
                    <br />
                </div>
            </div>

        </div>
    )
}

export default Advance
