import React from 'react'
import { motion, } from 'framer-motion';
import { element } from './types';

type H1props = {
    headings: element[],
    canvasRef: React.RefObject<HTMLDivElement> 
}

const H1Component: React.FC<H1props> = ({headings,  canvasRef}) => {
    return (
        <div>
            {headings.map((heading: element) => (
                <motion.h1
                    key={heading.id}
                    id={heading.id}
                    contentEditable="true"
                    style={{
                        fontSize: '28px',
                        padding: '10px',
                        border: '1px solid black',
                        outline: 'none',
                        display: 'inline-block',
                        position: 'absolute',
                        maxWidth: '1000px',
                        overflow: 'hidden'
                    }}

                    drag
                    dragConstraints={canvasRef}
                    dragElastic={false}
                >
                    {heading.text}  
                </motion.h1>
            ))}
        </div>
    )
}

export default H1Component
