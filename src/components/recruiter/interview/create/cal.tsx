import { SlCalender } from "react-icons/sl";
import Calendar from 'react-calendar';

const jojo = () => {
    return (
        <div className='flex flex-grow flex-shrink p-2 gap-5 justify-between'>
            <div className='w-full flex flex-col items-end'>
                <div className=' space-y-2'>
                    <p className="text-gray-500 text-sm">date and time</p>
                    <div className="border border-gray-300 rounded-md px-1 w-24">
                        <input type="text" className="text-xs" style={{border: "none", outline: "none", background: "none"}} placeholder="time" />
                    </div>
                </div>
            </div>
            <div className='space-y-2'>
                <div className='flex gap-1'>
                    < SlCalender className='w-3'/>
                    <p className='text-xs'>30 April 2024</p>
                </div>
                <Calendar />
            </div>
        </div>
    )
}

export default jojo