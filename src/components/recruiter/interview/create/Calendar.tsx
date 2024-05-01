import { IoMdArrowDropright } from "react-icons/io";
import { BsPeople, BsPerson, BsPersonFill, BsFillPeopleFill } from "react-icons/bs";
import { useState } from "react";
import { IoIosTimer } from "react-icons/io";
import { IoMdLaptop } from "react-icons/io";

import './Calendar.css'
import MultiTextBox from "./MultiTextBox";
import Jojo from "./cal"

const Calendar = () => {
    const [duration, setDuration] = useState('');
    const [eventType, setEventType] = useState("");

    const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setDuration(value);
    };

    const handleTypeChange = (type: any) => {
        setEventType(type);
    };

    return (
        <div className="flex-1 p-10 bg-[#fff] w-full">
            <div className="max-w-[1000px] items-center flex-1 justify-between p-10 border mx-auto min-h-[500px]">
                <h2 className="text-3xl font-semibold mb-4 text-gray-800">Event / Meet Management</h2>
                <div className="flex">
                    <div className="w-3/4">
                        <p className="text-gray-600">Schedule a new Event or Meet.</p>
                    </div>
                    <div className="w-1/4 flex justify-end">
                        <button className="bg-black  text-white font-sans py-1 px-8 rounded shadow-md">
                            Continue
                        </button>
                    </div>
                </div>

                <div className="mt-20 flex gap-10">
                    <div className="space-y-2">
                        <h3 className=" font-bold text-gray-800 text-lg">New Event Details</h3>
                        <hr className="bg-gray-700 p-[1px]" />

                        <p className="font-bold text-base text-gray-800">event name</p>
                        <input type="text" className="border border-gray-300 text-sm rounded-md p-2 mt-1 w-full" placeholder="New Event" />

                        <div>
                            <p className="font-bold text-base text-gray-800 mt-1">event duration</p>
                            <select
                                value={duration}
                                onChange={handleDurationChange}
                                className="border border-gray-300 text-sm rounded-md p-2 mt-1 w-full bg-white text-black"
                            >
                                <option value="10" style={{ backgroundColor: 'gray', color: 'white' }}>10 mins</option>
                                <option value="15" style={{ backgroundColor: 'gray', color: 'white' }}>15 mins</option>
                                <option value="20" style={{ backgroundColor: 'gray', color: 'white' }}>20 mins</option>
                                <option value="25" style={{ backgroundColor: 'gray', color: 'white' }}>25 mins</option>
                                <option value="30" style={{ backgroundColor: 'gray', color: 'white' }}>30 mins</option>
                                <option value="60" style={{ backgroundColor: 'gray', color: 'white' }}>1 hr</option>
                                <option value="75" style={{ backgroundColor: 'gray', color: 'white' }}>1.15 hr</option>
                                <option value="90" style={{ backgroundColor: 'gray', color: 'white' }}>1.30 hr</option>
                                <option value="105" style={{ backgroundColor: 'gray', color: 'white' }}>1.45 hr</option>
                                <option value="120" style={{ backgroundColor: 'gray', color: 'white' }}>2 hr</option>
                                <option value="135" style={{ backgroundColor: 'gray', color: 'white' }}>2.15 hr</option>
                                <option value="150" style={{ backgroundColor: 'gray', color: 'white' }}>2.30 hr</option>
                                <option value="165" style={{ backgroundColor: 'gray', color: 'white' }}>2.45 hr</option>
                            </select>

                        </div>

                        <p className="font-bold text-base text-gray-800">event type</p>
                        <div>
                            <div className="flex gap-2">
                                <div
                                    className={`flex border-2 p-2 rounded-md cursor-pointer ${eventType === "1" ? "bg-gray-400 text-white" : "bg-white"
                                        }`}
                                    onClick={() => handleTypeChange("1")}
                                >
                                    <BsPersonFill />
                                    <IoMdArrowDropright />
                                    <BsPerson />
                                </div>
                                <div
                                    className={`flex border-2 p-2 rounded-md cursor-pointer ${eventType === "2" ? "bg-gray-400 text-white" : "bg-white"
                                        }`}
                                    onClick={() => handleTypeChange("2")}
                                >
                                    <BsPersonFill />
                                    <IoMdArrowDropright />
                                    <BsPeople />
                                </div>
                                <div
                                    className={`flex border-2 p-2 rounded-md cursor-pointer ${eventType === "3" ? "bg-gray-400 text-white" : "bg-white"
                                        }`}
                                    onClick={() => handleTypeChange("3")}
                                >
                                    <BsFillPeopleFill />
                                    <IoMdArrowDropright />
                                    <BsPerson />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-2">
                        <div className="rounded-md border-t-[25px] min-h-[250px] shadow-md flex justify-between p-4 gap-4">
                            <div className="space-y-1">
                                <p className="font-extrabold text-gray-800">New Event</p>
                                <div className="flex items-center gap-2"><IoIosTimer /><span className="text-sm">10mins</span></div>
                                <div className="flex items-center gap-2"><IoMdLaptop /><span className="text-sm">one on one</span></div>
                                <p className="text-gray-500 text-sm">add hosts in priority</p>
                                <MultiTextBox />
                            </div>
                            <Jojo />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar;
