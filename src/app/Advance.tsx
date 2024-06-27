import React, { useEffect, useState, useCallback } from 'react';
import { AppWrapperProvider } from '@/context';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import ModalForClassName from './ModalForClass';

const Advance = () => {
    const [styles, setStyles] = useState('');
    const context = AppWrapperProvider();
    const [classStyles, setClassStyles] = useState('');

    if (!context) throw new Error('No context provided');
    const { state } = context;

    const onChangeStyle = useCallback((value: string) => {
        setStyles(value);
    }, []);

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

    const styleContent = (element: string, styles: string) => {
        if (!state) {
            alert("No element Selected");
            return;
        }
        let styleElement = document.getElementById('custom-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'custom-styles';
            document.head.appendChild(styleElement);
        }
        let styleContent = styleElement.innerHTML;
        styleContent = AddUpdateStyles(`${element}`, styleContent, styles);

        styleElement.innerHTML = styleContent;
    };

    const getExistingStyles = (element: string) => {
        const styleElement = document.getElementById('custom-styles');
        if (!styleElement) return '';

        const styleContent = styleElement.innerHTML;
        const regex = new RegExp(`\\.${element}\\s*{[^}]*}\\s*`, 'gi');
        const matches = styleContent.match(regex);
        return matches ? matches.join('\n') : '';
    };

    const AddNewClass = (className: string) => {
        if (!state) return;
        const elem = document.getElementById(state);
        if (!elem) {
            console.error(`Element with ID ${state} not found`);
            return;
        }
        elem.classList.add(`${className}_u`);
        console.log(`Added class ${className}_u to element:`, elem);
        styleContent(`.${className}_u`, classStyles);
    };

    useEffect(() => {
        if (state) {
            const existingStyles = getExistingStyles(`mainDivResizer_${state}`);
            setStyles(existingStyles);
        }
    }, [state]);

    return (
        <div>
            <div id='Advance' className='flex flex-col'>
                <CodeMirror
                    value={styles}
                    height="300px"
                    extensions={[css()]}
                    onChange={(value) => onChangeStyle(value)}
                />
                <button onClick={() => styleContent(`.mainDivResizer_${state}`, styles)}>Style NOW</button>
                <div>
                    <ModalForClassName
                        buttonText="Add Class"
                        headingText="Add New classes to Style"
                        isNew={true}
                        setClassStyles={setClassStyles}
                        classStyles={classStyles}
                        AddNewClass={AddNewClass}
                    />
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
