import React, { useMemo } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaRegClock } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FcAbout } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';


import { addMeeting } from '../../../../services/meeting';
import './Calendar.css'


type ValuePiece = Date | null | any;
type Value = ValuePiece | [ValuePiece, ValuePiece];
const Mainbody = () => {
    const navigate = useNavigate()
    const [value, onChange] = useState<Value>(new Date());
    const [showModal, setShowModal] = useState(false);
    const [eventName, setEventName] = useState<string>('')
    const [selectedDuration, setSelectedDuration] = useState<string>('10 mins');
    const [guests, setGuests] = useState([])
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const submitData = async () => {
        setShowModal(false)

        let user = localStorage.getItem("user")
        if (user) {
            const parsedUser = JSON.parse(user);
            const userEmail = parsedUser.email;
            const meetingResponse = await addMeeting({
                title: eventName,
                host: userEmail,
                dateOptions: value,
                duration: selectedDuration,
                isCompleted: false,
                timeOptions: selectedTimes,
                guests: emails
            });

            console.log(meetingResponse);
            navigate('/')
        } else {
            console.error('User information not found in local storage');
        }



    }
    const handleTimeClick = (time: string) => {
        if (selectedTimes.includes(time)) {
            setSelectedTimes(selectedTimes.filter((selectedTime) => selectedTime !== time));
        } else {
            setSelectedTimes([...selectedTimes, time]);
        }
    };
    const [emails, setEmails] = useState<any[]>([]);
    const [newEmail, setNewEmail] = useState('');

    const handleAddEmail = () => {


        if (newEmail.trim() !== '') {
            setEmails([...emails, { email: newEmail.trim(), isConfirmed: false }]);
            setNewEmail('');
        }
    };

    const handleRemoveEmail = (emailToRemove: string) => {
        setEmails(emails.filter((email) => email.email !== emailToRemove));
    };


    return (
        <>
            <div className='lg:grid lg:grid-cols-12 font-default'>
                <div className='lg:w-full lg:h-full lg:col-span-2'>
                    <div className='lg:h-screen mb-16 bg-white flex-row'>
                        <div className='flex-row justify-center items-center'>
                            <div>
                                <img width={250} src="/logo/logo.png" alt="logo" />
                            </div>
                            <div className='w-100 flex justify-center items-center mt-5 '>
                                <button className='border border-primary text-primary h-12 w-48 rounded-3xl text-black'><Link to={'/'}>Cancel</Link></button>

                            </div>
                            <hr />
                        </div>
                        <div className='w-100 flex-row mt-10 '>
                            <div className="flex-row">
                                <div className='flex justify-center items-center'>
                                    <div className='w-10/12 h-20 flex-row justify-center items-center mt-5 cursor-pointer'>
                                        <section className='mr-3'>
                                            <label htmlFor="exampleInput" className="text-sm text-gray-600 font-medium">
                                                Event Name
                                            </label>
                                        </section>
                                        <section>
                                            <input
                                                value={eventName}
                                                onChange={(e: any) => setEventName(e.target.value)}
                                                type="text"
                                                id="exampleInput"
                                                className="w-48 h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                                placeholder="Type here..."
                                            />
                                        </section>
                                    </div>




                                </div>
                                <div className='flex justify-center items-center'>
                                    <div className='w-10/12 h-20 flex-row justify-center items-center cursor-pointer'>
                                        <section className='mr-3'>
                                            <label htmlFor="durationSelect" className="text-sm text-gray-600 font-medium">
                                                Duration
                                            </label>
                                        </section>
                                        <section>
                                            <select
                                                id="durationSelect"
                                                className="w-48 h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                                value={selectedDuration}
                                                onChange={(e) => setSelectedDuration(e.target.value)}
                                            >
                                                <option value="10">10 mins</option>
                                                <option value="20">20 mins</option>
                                                <option value="30">30 mins</option>
                                                <option value="40">40 mins</option>
                                            </select>
                                        </section>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-center items-center'>
                                <div className='w-10/12 h-11 flex justify-center items-center shadow-md mt-5 cursor-pointer'>
                                    <section className='mr-3'><FcAbout /></section>
                                    <section onClick={() => setShowModal(!showModal)}>Create</section>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='lg:w-full lg:h-full shadow-2xl lg:col-span-10 bg-secondary'>
                    <div className='w-full h-1/6 text-2xl lg:text-4xl  flex justify-items-start  items-end'>

                        <h1 className='ml-20'>
                            Create New Event
                        </h1>

                    </div>
                    <div className=' w-full lg:flex lg:justify-center lg:items-center lg:h-5/6   hidden sm:hidden md:hidden'>
                        <div className='lg:w-3/4 lg:h-5/6  shadow-2xl bg-white relative flex rounded-2xl'>
                            <div className='lg:w-1/4 lg:h-full lg:flex lg:flex-col lg:items-center lg:justify-center hidden xl:flex mb-12'>
                                <div className='flex justify-center items-center w-full h-10  flex-row mt-12 font-semibold'>
                                    <div>
                                        <h1>Anshad Kt</h1>
                                    </div>


                                </div>

                                <div className='flex justify-center items-center w-full h-10  flex-row font-semibold'>

                                    <div>
                                        <h1>{eventName}</h1>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center w-full mt-5 flex-row font-light'>
                                    <div className='w-1/4 flex justify-center items-center '>
                                        <CiVideoOn />
                                    </div>
                                    <div className='w-3/4'>
                                        : Web conferencing details provided upon confirmation
                                    </div>
                                </div>
                                <div className='flex justify-center items-center w-full mt-5  flex-row font-light'>
                                    <div className='w-1/4 flex justify-center items-center '>
                                        <FaRegClock />
                                    </div>
                                    <div className='w-3/4'>
                                        : {selectedDuration}
                                    </div>
                                </div>
                            </div>

                            <div className='lg:w-2/4 lg:h-full lg:flex lg:flex-col lg:items-center lg:justify-center hidden sm:hidden md:hidden'>
                                <div className='lg:mb-10 '>
                                    <h1>Select date and time</h1>
                                </div>
                                <Calendar
                                    className='lg:mb-20 lg:rounded-2xl'
                                    selectRange={true}
                                    onChange={onChange}
                                    value={value}
                                />
                            </div>

                            <div className='lg:w-1/4 lg:h-full lg:flex-row overflow-y-auto hidden sm:flex md:flex lg:flex xl:flex'>
                                <div className='h-10 w-full  text-center mt-12 font-semibold'>
                                    <h1>
                                        {value && value.length === 2
                                            ? `${new Date(value[0]).toLocaleDateString('en-GB')} to ${new Date(value[1]).toLocaleDateString('en-GB')}`
                                            : 'Select date and time'}
                                    </h1>
                                </div>

                                <div className='hidden lg:flex lg:flex-col lg:items-center lg:justify-evenly lg:overflow-y-auto lg:h-full lg:w-full lg:text-center'>
                                    <div className='h-10 w-3/4 rounded-lg'>
                                        <button
                                            className={`w-full h-full bg-primary rounded-lg ${selectedTimes.includes('9:30 AM') ? 'bg-green-500' : ''
                                                }`}
                                            onClick={() => handleTimeClick('9:30 AM')}
                                        >
                                            <h1 className='text-white'>9:30 AM</h1>
                                        </button>
                                    </div>
                                    <div className='h-10 w-3/4 rounded-lg'>
                                        <button
                                            className={`w-full h-full bg-primary rounded-lg ${selectedTimes.includes('10:00 AM') ? 'bg-green-500' : ''
                                                }`}
                                            onClick={() => handleTimeClick('10:00 AM')}
                                        >
                                            <h1 className='text-white'>10:00 AM</h1>
                                        </button>
                                    </div>
                                    <div className='h-10 w-3/4 rounded-lg'>
                                        <button
                                            className={`w-full h-full bg-primary rounded-lg ${selectedTimes.includes('10:30 AM') ? 'bg-green-500' : ''
                                                }`}
                                            onClick={() => handleTimeClick('10:30 AM')}
                                        >
                                            <h1 className='text-white'>10:30 AM</h1>
                                        </button>
                                    </div>
                                    <div className='h-10 w-3/4 rounded-lg'>
                                        <button
                                            className={`w-full h-full bg-primary rounded-lg ${selectedTimes.includes('11:00 AM') ? 'bg-green-500' : ''
                                                }`}
                                            onClick={() => handleTimeClick('11:00 AM')}
                                        >
                                            <h1 className='text-white'>11:00 AM</h1>
                                        </button>
                                    </div>
                                    <div className='h-10 w-3/4 rounded-lg'>
                                        <button
                                            className={`w-full h-full bg-primary rounded-lg ${selectedTimes.includes('11:30 AM') ? 'bg-green-500' : ''
                                                }`}
                                            onClick={() => handleTimeClick('11:30 AM')}
                                        >
                                            <h1 className='text-white'>11:30 AM</h1>
                                        </button>
                                    </div>
                                    <div className='h-10 w-3/4 rounded-lg'>
                                        <button
                                            className={`w-full h-full bg-primary rounded-lg ${selectedTimes.includes('12:00 PM') ? 'bg-green-500' : ''
                                                }`}
                                            onClick={() => handleTimeClick('12:00 PM')}
                                        >
                                            <h1 className='text-white'>12:00 PM</h1>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='lg:hidden  w-full flex justify-center  h-5/6'>
                        <div className='w-3/4 bg-white  flex justify-center rounded-2xl'>


                            <div className='w-1/4 h-full flex-col items-center justify-center mb-12'>
                                <div className='flex justify-center items-center w-full h-10  flex-row mt-12 font-semibold'>
                                    <div>
                                        <h1>Anshad Kt</h1>
                                    </div>
                                </div>

                                <div className='flex justify-center items-center w-full h-10  flex-row font-semibold'>

                                    <div>
                                        <h1>{eventName}</h1>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center w-full mt-5 flex-row font-light'>
                                    <div className='w-1/4 flex justify-center items-center mr-3'>
                                        <CiVideoOn />
                                    </div>
                                    <div className='w-3/4'>
                                        : Web conferencing details provided upon confirmation
                                    </div>
                                </div>
                                <div className='flex justify-center items-center w-full mt-5  flex-row font-light'>
                                    <div className='w-1/4 flex justify-center items-center mr-3'>
                                        <FaRegClock />
                                    </div>
                                    <div className='w-3/4'>
                                        : {selectedDuration}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='lg:hidden  w-full flex justify-center  h-5/6'>
                        <div className='w-3/4 bg-white  flex justify-center rounded-2xl'>

                            <div className='w-full p-5 h-full flex lg:hidden flex-col items-center justify-center '>
                                <div className='mb-10 '>
                                    <h1>Select date and time</h1>
                                </div>
                                <Calendar
                                    className='mb-20 rounded-2xl'
                                    selectRange={true}
                                    onChange={onChange}
                                    value={value}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='lg:hidden  w-full flex justify-center items-center  h-5/6'>
                        <div className='w-3/4 h-full flex-row justify-center overflow-y-auto lg:hidden bg-white'>
                            <div className='h-10 w-full  text-center  font-semibold'>
                                <h1>
                                    {value && value.length === 2
                                        ? `${new Date(value[0]).toLocaleDateString('en-GB')} to ${new Date(value[1]).toLocaleDateString('en-GB')}`
                                        : 'Select date and time'}
                                </h1>
                            </div>
                            <div className='w-full flex justify-center items-center'>
                                <div className='w-3/4 h-full bg-red-200 pt-5 flex justify-center items-center rounded-2xl'>
                                    <div className='flex flex-col items-center justify-evenly overflow-y-auto h-full w-full text-center'>
                                        <div className='h-10 w-3/4 rounded-lg'>
                                            <button
                                                className={`w-full h-full bg-primary rounded-lg ${selectedTimes.includes('9:30 AM') ? 'bg-green-500' : ''
                                                    }`}
                                                onClick={() => handleTimeClick('9:30 AM')}
                                            >
                                                <h1 className='text-white'>9:30 AM</h1>
                                            </button>
                                        </div>
                                        <div className='h-10 w-3/4 rounded-lg mt-5'>
                                            <button
                                                className={`w-full h-full bg-primary rounded-lg ${selectedTimes.includes('10:00 AM') ? 'bg-green-500' : ''
                                                    }`}
                                                onClick={() => handleTimeClick('10:00 AM')}
                                            >
                                                <h1 className='text-white'>10:00 AM</h1>
                                            </button>
                                        </div>
                                        <div className='h-10 w-3/4 rounded-lg mt-5'>
                                            <button
                                                className={`w-full h-full bg-primary rounded-lg ${selectedTimes.includes('10:30 AM') ? 'bg-green-500' : ''
                                                    }`}
                                                onClick={() => handleTimeClick('10:30 AM')}
                                            >
                                                <h1 className='text-white'>10:30 AM</h1>
                                            </button>
                                        </div>
                                        <div className='h-10 w-3/4 rounded-lg mt-5'>
                                            <button
                                                className={`w-full h-full bg-primary rounded-lg ${selectedTimes.includes('11:00 AM') ? 'bg-green-500' : ''
                                                    }`}
                                                onClick={() => handleTimeClick('11:00 AM')}
                                            >
                                                <h1 className='text-white'>11:00 AM</h1>
                                            </button>
                                        </div>
                                        <div className='h-10 w-3/4 rounded-lg mt-5'>
                                            <button
                                                className={`w-full h-full bg-primary rounded-lg ${selectedTimes.includes('11:30 AM') ? 'bg-green-500' : ''
                                                    }`}
                                                onClick={() => handleTimeClick('11:30 AM')}
                                            >
                                                <h1 className='text-white'>11:30 AM</h1>
                                            </button>
                                        </div>
                                        <div className='h-10 w-3/4 rounded-lg mt-5'>
                                            <button
                                                className={`w-full h-full bg-primary rounded-lg ${selectedTimes.includes('12:00 PM') ? 'bg-green-500' : ''
                                                    }`}
                                                onClick={() => handleTimeClick('12:00 PM')}
                                            >
                                                <h1 className='text-white'>12:00 PM</h1>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {showModal ? (
                        <>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-full md:w-3/4 lg:w-2/3 xl:w-1/2 my-6 mx-auto max-w-3xl">
                                    {/* content */}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/* header */}
                                        <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                                {eventName}
                                            </h3>
                                            <div className='flex justify-center items-center mr-5'>
                                                <FaRegClock />
                                                : {selectedDuration}
                                                <div className='ml-10'>
                                                    ScheduleEase Meet
                                                </div>
                                            </div>
                                            <div className='mt-3'>
                                                Add times to email
                                            </div>
                                        </div>
                                        {/* body */}
                                        <div className="p-5 flex justify-start items-center bg-slate-300 h-auto md:h-3/4">
                                            <div className="flex-col justify-start items-center">
                                                <section className='mr-3'>
                                                    <label htmlFor="exampleInput" className="mb-7 text-sm text-gray-600 font-medium">
                                                        Add guests
                                                    </label>
                                                </section>
                                                <section className='flex mt-1'>
                                                    <input
                                                        value={newEmail}
                                                        onChange={(e) => setNewEmail(e.target.value)}
                                                        type="text"
                                                        id="exampleInput"
                                                        className="w-48 md:w-full h-9 px-3 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                                        placeholder="Type here..."
                                                    />
                                                    <IoIosAddCircle className='ml-3' onClick={handleAddEmail} size={34} />
                                                </section>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            {emails.map((email) => (
                                                <div key={email.email} className="border rounded p-2 mt-2 flex items-center bg">
                                                    <span className="mr-2">{email.email}</span>
                                                    <button
                                                        onClick={() => handleRemoveEmail(email.email)}
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        {/* footer */}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={submitData}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}

                </div>
            </div>
        </>
    )
}

export default Mainbody