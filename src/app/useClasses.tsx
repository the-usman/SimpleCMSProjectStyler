import { useState, useEffect } from 'react';
import useStyles from './useStyles';

const useClasses = (state: string, classStyles: string) => {
    const { styleContent } = useStyles(state);
    const [AllClasses, setAllClasses] = useState<string[]>([]);

    const AddNewClass = (className: string) => {
        if (!state) return;
        const elem = document.getElementById(state);
        if (!elem) {
            console.error(`Element with ID ${state} not found`);
            return;
        }
        elem.classList.add(`${className}_u`);
        styleContent(`.${className}_u`, classStyles);
        GetAllClass();
    };

    const GetAllClass = () => {
        if (!state) return;
        const elem = document.getElementById(state);
        const arr: string[] = [];
        elem?.classList.forEach((element) => {
            if (element.split("_u").pop() === "") {
                arr.push(element.split("_u")[0]);
            }
        })
        setAllClasses(arr);
    };

    const UpdateClassStyles = (className: string) => {
        if (!state) return;
        styleContent(`.${className}_u`, classStyles);
    };

    useEffect(() => {
        GetAllClass();
    }, [state]);

    return { AllClasses, AddNewClass, UpdateClassStyles };
};

export default useClasses;
