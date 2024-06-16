import React, { useEffect, useRef, useState } from 'react'

type sizer = {
    clientX: number,
    clientY: number
}

const Resizer = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState<sizer>({ clientX: 0, clientY: 0 });



    const handleLeftMove = (e: MouseEvent) => {
        const resizeAbleBox = ref.current;
        const boxCSS = get
    }

    const handleEndLeft = () => {
        document.removeEventListener('mousemove', handleLeftMove);
    }

    useEffect(() => {

    }, []);

    return (
        <div>
            <div ref={ref} className='mainDivResizer absolute ' >
                {
                    children
                }
                <div ref={topRef} className='topRef absolute h-[100%]'>.</div>
                <div ref={leftRef} className='leftRef absolute h-[100%]'>left</div>
                <div ref={rightRef} className='rightRef absolute h-[100%]'>.</div>
                <div ref={bottomRef} className='bottomRef absolute h-[100%]'>.</div>
            </div>

        </div>
    )
}

export default Resizer
