import React, { useState } from 'react';
import { AppWrapperProvider } from '@/context';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import ModalForClassName from './ModalForClass';
import useStyles from './useStyles';
import useClasses from './useClasses';

const Advance = () => {
    const [classStyles, setClassStyles] = useState('');
    const context = AppWrapperProvider();

    if (!context) throw new Error('No context provided');
    const { state } = context;

    const { styles, onChangeStyle, styleContent, getExistingStyles } = useStyles(state as string);
    const { AllClasses, AddNewClass, UpdateClassStyles } = useClasses(state as string, classStyles);

    return (
        <div>
            <div id='Advance' className='flex flex-col p-2'>
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
                    <h1 className='text-2xl font-bold'>All Classes on This Element</h1>
                    <br />
                    {AllClasses.map(className => (
                        <ModalForClassName
                            buttonText={`Update ${className}`}
                            headingText={`Update Class ${className}`}
                            isNew={false}
                            setClassStyles={setClassStyles}
                            classStyles={classStyles}
                            AddNewClass={UpdateClassStyles}
                            getExistingStyles={getExistingStyles}
                            key={className}
                        />
                    ))}
                    <br />
                </div>
            </div>
        </div>
    );
};

export default Advance;
