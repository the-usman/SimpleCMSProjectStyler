import { AppContext } from '@/context/indext'
import React, { useContext } from 'react'

const FontWeight = () => {
    const context = useContext(AppContext);
    
    return (
        <div className='font-size flex justify-between w-[100%] mt-3'>
            <div className="styleLabel m-2 font-bold">
                    Font Weight
                </div>
            <select name="fontWeight" id=""
                onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                        if (context?.state) {
                            const elem = document.getElementById(context.state) 
                            if (!elem) return;
                            elem.style.fontWeight = value;
                        }
                    }
                }}
            
            >
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
                <option value="800">800</option>
                <option value="900">900</option>
            </select>
        </div>
    )
}
export default FontWeight;