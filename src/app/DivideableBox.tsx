import React, { useRef } from 'react';
import { useDivideableBox } from './useDivideableBox';
import { DivideableBoxProps } from './types';

const DivideableBox: React.FC<DivideableBoxProps> = ({ children, childRef, content, divisionCount }) => {
    const [divisions, renderContentInDivisions] = useDivideableBox(childRef, content, divisionCount);

    return (
        <div  style={{ position: 'relative', width: '100%', height: '100%' }}>
            {children}
            {renderContentInDivisions()}
        </div>
    );
};

export default DivideableBox;
