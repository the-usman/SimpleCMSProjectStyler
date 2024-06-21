import Image from 'next/image'
import React from 'react'

const Icon = ({ src, text, onClick }: { src: string, text: string, onClick: VoidFunction }) => {
    return (
        <div>
            <button onClick={onClick} className='w-[170px] h-[120px] border border-black flex flex-col items-center justify-center rounded-lg'>
                <Image src={src} alt="" width={80} height={0} />
                <div className='mt-2'>
                    {text}
                </div></button>
        </div>
    )
}

export default Icon
