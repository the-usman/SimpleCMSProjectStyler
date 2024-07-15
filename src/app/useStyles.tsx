import { useState, useEffect, useCallback } from 'react';

const useStyles = (state: string) => {
    const [styles, setStyles] = useState('');

    const onChangeStyle = useCallback((value: string ) => {
        setStyles(value);
    }, []);

    const AddUpdateStyles = (element: string, stylesFull: string, styles: string) => {
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

    useEffect(() => {
        if (state) {
            const existingStyles = getExistingStyles(`${state}`);
            setStyles(existingStyles);
        }
    }, [state]);

    return { styles, onChangeStyle, styleContent, getExistingStyles };
};

export default useStyles;
