import { AppWrapperProvider } from '@/context';
import React, { useEffect, useState } from 'react';

const Advance = () => {
    const [styles, setStyles] = useState(``);
    const context = AppWrapperProvider();

    if (!context) throw new Error('No context provided');
    const { state } = context;

    const onChangeStyle = (e: any) => {
        setStyles(e.target.innerText);
    };

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
            alert("No element Selected");
            return;
        }
        const cssStyle = document.getElementById('css')?.innerText || '';
        let styleElement = document.getElementsByTagName('style')[0];
        if (!styleElement) {
            styleElement = document.createElement('style');
            document.head.appendChild(styleElement);
        }
        let styleContent = styleElement.innerHTML;
        styleContent = AddUpdateStyles(`.mainDivResizer_${state}`, styleContent, cssStyle);

        styleElement.innerHTML = styleContent;
    };

    const getExistingStyles = (element: string) => {
        const styleElement = document.getElementsByTagName('style')[0];
        if (!styleElement) return '';

        const styleContent = styleElement.innerHTML;
        const regex = new RegExp(`\\.${element}\\s*{[^}]*}\\s*`, 'gi');
        const matches = styleContent.match(regex);
        return matches ? matches.join('\n') : '';
        
    };

    useEffect(() => {
        if (state) {
            const existingStyles = getExistingStyles(`mainDivResizer_${state}`);
            console.log(existingStyles);
            const cssBox = document.getElementById('css');
            if (cssBox) {
                cssBox.innerText = existingStyles;
            }
        }
    }, [state]);

    return (
        <div>
            <div id='Advance' className='flex flex-col'>
                <div
                    contentEditable={true}
                    className='h-[300px] overflow-auto'
                    id='css'
                    onInput={onChangeStyle}
                ></div>
                <button onClick={styleContent}>Style NOW</button>
                <div>
                    See classes on this element
                    <br />
                    <br />
                </div>
                <div>
                    See All existed classes
                    <br />
                </div>
            </div>
        </div>
    );
};

export default Advance;
