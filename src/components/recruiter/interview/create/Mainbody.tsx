import { IoMdArrowDropright } from "react-icons/io";
import { BsPeople, BsPerson, BsPersonFill, BsFillPeopleFill } from "react-icons/bs";
import { MouseEvent, useState } from "react";
import { IoIosTimer } from "react-icons/io";
import { IoMdLaptop } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import './Mainbody.css'
import MultiTextBox from "./MultiTextBox";
import CalendarComponent from "./Calendar"
import Navbar2 from "../../../applicant/Navbar2";
import dayjs from "dayjs";
import { api } from "../../../../services/axios";
import { toast } from "react-toastify";
import { NotificationType } from "../../../../types/interface";

const Mainbody = () => {
    const navigate = useNavigate()

    const [duration, setDuration] = useState(10);
    const [eventName, setEventName] = useState("New Event");
    const [eventType, setEventType] = useState("one_on_one");
    const [hostEmail, setHostEmail] = useState<string | null>(null);
    const [candidateEmail, setCandidateEmail] = useState<string | null>(null);
    const [hostsEmails, setHostsEmails] = useState<string[]>([]);
    const [candidatesEmails, setCandidatesEmails] = useState<string[]>([]);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState<dayjs.Dayjs | null>(null);

    const formatType = (type: string) => {
        if (type == "one_on_one") {
            return `one on one`
        } else if (type == "group") {
            return `group`
        } else {
            return `collective`
        }
    }

    const formatDuration = (duration: number) => {
        const minutes = duration;
        if (minutes >= 60) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours}.${remainingMinutes} hrs`;
        } else {
            return `${minutes} mins`;
        }
    };

    const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        const minutes = parseInt(value);
        setDuration(minutes);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value == "") {
            setEventName("New Event")
        } else {
            const newValue = value.charAt(0).toUpperCase() + value.slice(1);
            setEventName(newValue);
        }
    };

    const handleTypeChange = (type: any) => {
        setEventType(type);
    };

    const handleHostEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setHostEmail(value);
    }

    const handleCandidateEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCandidateEmail(value);
    }

    const handleHostsEmailsChange = (data: string[]) => {
        setHostsEmails(data);
    }

    const handleCandidatesEmailsChange = (data: string[]) => {
        setCandidatesEmails(data);
    }

    const handleDateTimeChange = (dateTimeData: any) => {
        console.log("dateTimeData")
        console.log(dateTimeData)
        setDate(dateTimeData?.date)
        setTime(dateTimeData?.time)
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        console.log("handle Submit")
        event.preventDefault();

        const currentTime = dayjs();
        // const selectedTime = time;
        const isToday = dayjs(date).isSame(currentTime, 'day');
        console.log("currentTime", currentTime)
        // console.log("selectedTime", selectedTime)
        console.log("isToday", isToday)

        if (!eventType) {
            toast.error("Event type cannot be empty.");
            return;
        }

        if (!time) {
            toast.error("Time cannot be empty.");
            return;
        }

        // if (selectedTime && isToday && selectedTime.isBefore(currentTime.add(5, 'minute'))) {
        //     console.log("kjdfn")
        //     toast.error("The time should be at least 5 minutes ahead of the current time.");
        //     return;
        // }

        const formDataObject = {
            duration,
            eventName,
            eventType,
            host: hostEmail,
            candidate_email: candidateEmail,
            team: hostsEmails,
            candidates_emails: candidatesEmails,
            date,
            time: time,
        };
        console.log(formDataObject)

        try {
            const response = await api.post('/interview/create', formDataObject);
            // Check if the signup was successful
            if (response.status === 200) {
                console.log(response.data);
                toast.success("Interview created successfully");

                const formDataObject2 = {
                    job_type: response.data.result.eventType,
                    host: response.data.result.host,
                    team: response.data.result.team,
                    candidate_email: response.data.result.candidate_email,
                    candidates_emails: response.data.result.candidates_emails,
                    interviewId: response.data.result._id,
                }
                console.log(formDataObject2)

                const response2 = await api.post('./interview/common/sendMail', formDataObject2)
                if (response2.status === 200) {
                    console.log(`comform emails has sent successfully`, response2.data?.verification)
                    toast.success("comform emails has sent successfully");

                    navigate(`/recruiter/schedules`)
                } else {
                    console.log("email sending failed")
                }

                // Create notification data
                const notificationData1 = {
                    type: NotificationType.InterviewCreated,
                    userId: response.data?.result?.recruiterId,
                    role: 'recruiter',
                    message: `A new interview has been scheduled "${eventName}" has been created!`,
                    interviewId: response.data?.result?._id,
                    read: false,
                };

                const notificationResponse1 = await api.post('/chat/notification/create', notificationData1);

                if (notificationResponse1.status === 200) {
                    console.log('Notification created successfully');
                    toast.success('Notification created successfully');
                } else {
                    toast.error('Failed to create notification. Please try again later.');
                }

            } else {
                toast.error('Interview creation failed. Please try again later.');
            }

        } catch (error) {
            console.error("Internal server error:", error);
            toast.error("Internal server error. Please try again later.");
        }
    }

    return (
        <div className="flex justify-center w-full bg-white">
            <div className='max-w-[1100px] lg:min-w-[1100px] min-h-[500px]'>
                <div className="items-center flex flex-col justify-between p-5">
                    <Navbar2 />

                    <div className="w-full space-y-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#2B2B2E] justify-start barlow-regular">Event / Meet Management</h2>
                        <div className="flex">
                            <div className="w-3/4">
                                <p className="text-gray-600">Schedule a new Event or Meet.</p>
                            </div>
                            <div className="w-1/4 flex justify-end">
                                <button className="hover:bg-pink-400 bg-pink-500 text-white font-sans py-1 px-8 rounded shadow-md" onClick={handleSubmit}>
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-20 flex gap-10">
                        <div className="space-y-2">
                            <h3 className=" barlow-semibold text-gray-800 text-lg">New Event Details</h3>
                            <hr className="bg-gray-700 p-[1px]" />

                            <p className=" barlow-semibold text-base text-gray-800" >event name</p>
                            <input type="text" name="event_name" className="border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-sm rounded-md p-2 mt-1 w-full" onChange={handleNameChange} placeholder="New Event" />

                            <div>
                                <p className=" barlow-semibold text-base text-gray-800 mt-1">event duration</p>
                                <select
                                    value={duration}
                                    onChange={handleDurationChange}
                                    className="border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-sm rounded-md p-2 mt-1 w-full bg-white text-black"
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

                            <p className=" barlow-semibold text-base text-gray-800">event type</p>
                            <div>
                                <div className="flex gap-2">
                                    <div
                                        className={`flex border-2 p-2 rounded-md cursor-pointer ${eventType === "one_on_one" ? "bg-gray-400 text-white" : "bg-white"
                                            }`}
                                        onClick={() => handleTypeChange("one_on_one")}
                                    >
                                        <BsPersonFill />
                                        <IoMdArrowDropright />
                                        <BsPerson />
                                    </div>
                                    <div
                                        className={`flex border-2 p-2 rounded-md cursor-pointer ${eventType === "group" ? "bg-gray-400 text-white" : "bg-white"
                                            }`}
                                        onClick={() => handleTypeChange("group")}
                                    >
                                        <BsPersonFill />
                                        <IoMdArrowDropright />
                                        <BsPeople />
                                    </div>
                                    <div
                                        className={`flex border-2 p-2 rounded-md cursor-pointer ${eventType === "collective" ? "bg-gray-400 text-white" : "bg-white"
                                            }`}
                                        onClick={() => handleTypeChange("collective")}
                                    >
                                        <BsFillPeopleFill />
                                        <IoMdArrowDropright />
                                        <BsPerson />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full px-4 py-2">
                            <div className=" rounded-md border-t-[25px] min-h-[250px] shadow-md flex justify-between p-4 gap-4">
                                <div className="w-1/2 space-y-1">
                                    <p className=" font-extrabold text-gray-800">{eventName}</p>
                                    <div className="flex items-center gap-2"><IoIosTimer /><span className="text-sm">{formatDuration(duration)}</span></div>
                                    <div className="flex items-center gap-2"><IoMdLaptop /><span className="text-sm">{formatType(eventType)}</span></div>
                                    <div >
                                        {
                                            eventType == "one_on_one" ? (
                                                <>
                                                    <p className="mt-2 text-gray-500 text-sm">add host email and then invitee email</p>
                                                    {/* <MultiTextBox onDataUpdate={handleEmailsChange} /> */}
                                                    <div className="flex flex-col gap-2 mt-2">
                                                        <input type="text" name="host_email" className="border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-sm rounded-md p-2 mt-1 w-full" onChange={handleHostEmailChange} placeholder="Host email" />
                                                        <input type="text" name="candidate_email" className="border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-sm rounded-md p-2 mt-1 w-full" onChange={handleCandidateEmailChange} placeholder="Candidate Email" />
                                                    </div>
                                                </>
                                            ) : (
                                                eventType == "group" ? (
                                                    <>
                                                        <p className="mt-2 text-gray-500 text-sm">add host email and then invitees emails</p>
                                                        <div className="flex flex-col gap-2 mt-2">
                                                            <input type="text" name="host_email" className="border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-sm rounded-md p-2 mt-1 w-full" onChange={handleHostEmailChange} placeholder="Host email" />
                                                            <MultiTextBox onDataUpdate={handleCandidatesEmailsChange} />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="mt-2 text-gray-500 text-sm">add hosts emails and then invitees email</p>
                                                        <div className="flex gap-2 mt-2">
                                                            <MultiTextBox onDataUpdate={handleHostsEmailsChange} />
                                                            <MultiTextBox onDataUpdate={handleCandidatesEmailsChange} />
                                                        </div>
                                                    </>
                                                )
                                            )
                                        }

                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <CalendarComponent onDateTimeChange={handleDateTimeChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mainbody;
