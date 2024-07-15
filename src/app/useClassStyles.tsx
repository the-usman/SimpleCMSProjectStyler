import { useState, useCallback, useEffect } from 'react';
import useStyles from './useStyles';
import useClasses from './useClasses';
import ModalForClassName from './ModalForClass';

const useClassStyles = (state: string, defaultClassStyles = '', CustomUIComponent = ModalForClassName) => {
    const { styles, onChangeStyle, styleContent, getExistingStyles } = useStyles(state);
    const { AllClasses, AddNewClass, UpdateClassStyles } = useClasses(state, defaultClassStyles);
    const [classStyles, setClassStyles] = useState(defaultClassStyles);

    useEffect(() => {
        if (state) {
            const existingStyles = getExistingStyles(`mainDivResizer_${state}`);
            setClassStyles(existingStyles);
        }
    }, [state]);

    const renderUI = (props: any
        
    ) => (
        <CustomUIComponent
            buttonText={props.buttonText}
            headingText={props.headingText}
            isNew={props.isNew}
            setClassStyles={setClassStyles}
            classStyles={classStyles}
            AddNewClass={AddNewClass}
            getExistingStyles={getExistingStyles}
        />
    );

    return { AllClasses, AddNewClass, UpdateClassStyles, renderUI, setClassStyles, classStyles };
};

export default useClassStyles;
