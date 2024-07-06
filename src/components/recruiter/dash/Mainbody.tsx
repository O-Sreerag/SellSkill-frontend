import { useSelector } from "react-redux"
import { AppRootState } from "../../../redux/store"
import Navbar2 from "../Navbar2"
import { ImProfile } from "react-icons/im"
import './Mainbody.css'
import { SiGooglemeet } from "react-icons/si"
import { FaUserTie } from "react-icons/fa"
import { IoNotifications } from "react-icons/io5"
import { LuMessagesSquare } from "react-icons/lu"
import { useState, useEffect } from "react"
import { api } from "../../../services/axios"
import { GiPlainCircle } from "react-icons/gi"

interface CardData {
    id: number;
    _id: string;
    title: string;
    content: string;
    url: string;
}

export interface MessageData {
    message: string;
    time: Date;
    status: string;
    from: {
        name: string;
        id: string;
        role: string;
    };
    to: {
        name: string;
        id: string;
        role: string;
    };
}

interface PeopleData {
    _id: string
    user1Id: string // applicant
    user2Id: string // recruiter
    user1_name: string
    user2_name: string
    last_online: Date
    chat: MessageData[]
    createdAt: Date
    updatedAt: Date
}

interface People {
    id: number
    item: PeopleData
}

interface NotificationData {
    _id?: string;
    type: NotificationType;
    userId: string;
    role: string;
    message: string;
    createdAt: Date;
    read?: boolean;
    careerId?: string;
    interviewId?: string;
}

enum NotificationType {
    CareerCreated = 'career_created',
    ApplicationReceived = 'application_received',
    InterviewCreated = 'interview_created',
    InterviewConfirmed = 'interview_confirmed',
    InterviewInvitation = 'interview_invitation',
    ApplicationAccepted = 'application_accepted',
}

interface Notification {
    id: number
    item: NotificationData
}

interface RecruiterProfie {
    companyName: string
    industry: string
    headquarters: string
    ceo: string
    founded: string
    employees: string
    revenue: string
}

const Mainbody = () => {

    const [cardsData, setCardsData] = useState<CardData[]>([]);
    const [people, setPeople] = useState<People[]>([])
    const [notifications, setNotifications] = useState<Notification[]>([])
    const { userName = 'Name', userEmail = 'email', userRole = "", userProfile = { companyName: "", industry: "", headquarters: "", ceo: "", founded: "", employees: "", revenue: "" } } = useSelector((state: AppRootState) => state.user)
    const [profile, setProfile] = useState<RecruiterProfie>({ companyName: "", industry: "", headquarters: "", ceo: "", founded: "", employees: "", revenue: "" })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/career/getall`)
                console.log(response.data)
                const data = response.data.result;
                setCardsData(data.map((item: { _id: string; posting_title: string; required_skills: any; url: string }, index: number) => ({
                    id: index + 1,
                    _id: item._id,
                    title: item.posting_title,
                    content: [item.required_skills[0], item.required_skills[1]],
                    url: item.url,
                })));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all connected applicants for the current recruiter
                console.log("Fetch all connected applicants for the current recruiter")
                const response = await api.get(`/chat/room/getall`)
                console.log(response.data)
                const data = response.data.result;
                console.log(data)
                setPeople(data.map((item: PeopleData, index: number) => ({
                    id: index + 1,
                    item: item,
                })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const formatDateAndTime = (timestamp: string | number | Date) => {
        const date = new Date(timestamp);

        // Format the date
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }); // Get the short name of the day
        const dateString = `${month}/${day} ${dayOfWeek}`;

        // Format the time
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight case
        const timeString = `${hours}.${minutes < 10 ? '0' : ''}${minutes} ${period}`;

        return { dateString, timeString };
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("fetching all notifications")
                const response = await api.get(`/chat/notification/getall`)
                console.log(response.data)
                const data = response.data.result;
                console.log(data)
                setNotifications(data.map((item: NotificationData, index: number) => ({
                    id: index + 1,
                    item: item,
                })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [userRole]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching user profile")
            try {
                const response = await api.get(`/auth/recruiter/get`)
                console.log(response.data)
                const data = response.data.result;
                if (data?.profile) {
                    setProfile(data.profile)
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="flex justify-center w-full bg-white">
            <div className='max-w-[1100px] lg:min-w-[1100px] min-h-[500px]'>
                <div className="items-center  flex flex-col justify-between p-5">
                    <Navbar2 />
                    <h2 className="text-3xl font-semibold mb-4 text-blue-gray-800">Hello, {userName}</h2>

                    <div className="space-y-5">
                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="flex justify-start w-full gap-1 pl-8 text-sm font-semibold text-blue-gray-800 items-center">
                                <ImProfile />
                                <p>All Careers</p>
                            </div>
                            <div className="cards-container flex gap-3 max-w-[1000px] overflow-x-scroll custom-scrollbar w-full py-3">
                                {cardsData && cardsData.length >= 1 ? (
                                    cardsData.map((card) => (
                                        <div id={card._id}
                                            className="flex-col flex rounded-lg bg-pink-50 w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                            <div className="h-[30%] bg-pink-300 rounded-t-lg">
                                                <div className="ml-3 mt-7">
                                                    <ImProfile className="text-md" />
                                                </div>
                                            </div>
                                            <div className="p-2">
                                                <p>{card.title}</p>
                                                <p>{card.content}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-full flex flex-col items-start pl-8">
                                        <div className="flex flex-col justify-start items-center">
                                            <p className="text-sm text-blue-gray-600">Whoops!! Careers not updated</p>
                                        </div>
                                    </div>
                                )
                                }
                                {/* <div className="flex-col flex rounded-lg bg-[#fff] w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-gray-200 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="w-full flex flex-col justify-center items-center gap-3">
                            <div className="flex justify-start w-full gap-1 pl-8 text-sm font-semibold text-blue-gray-800 items-center">
                                <SiGooglemeet />
                                <p>Upcoming Schedules</p>
                            </div>
                            <div className="w-full rounded-lg bg-[#fff] max-w-[1000px] flex shadow-md border border-t-8 border-gray-200">
                                <div className="w-1/2 border-r border-gray-200 p-5 space-y-3">
                                    <div className=" h-7 w-7 flex justify-center items-center border-t-8 border border-[#2fdee4] rounded-md">
                                        <p className="font-semibold text-[#2fdee4]">24</p>
                                    </div>
                                    <p className="text-sm text-blue-gray-800">You got an upcoming Event on 24, 12.00 pm</p>
                                    <p className="text-sm text-blue-500">view more details</p>
                                </div>
                                <div className="w-1/2 max-h-[250px] overflow-y-scroll custom-scrollbar my-2">
                                    <div className="flex p-5 hover:bg-[#f5f8fa]">
                                        <div className="w-[30%]">
                                            <p className="text-sm text-blue-gray-800">Today Jun 24</p>
                                        </div>
                                        <div className="w-[60%] flex flex-col gap-3">
                                            <div className="border-l-4 border-gray-200 pl-2">
                                                <div className="flex items-center shadow-md border rounded-md gap-3 p-3 bg-[#fff] h-[50px] justify-between">
                                                    <div>
                                                        <p className="text-sm text-blue-gray-800">MERN Stack</p>
                                                        <p className="text-xs text-blue-gray-800">12.00 pm</p>
                                                    </div>
                                                    <div>
                                                        <div className="flex gap-2 cursor-pointer bg-gray-200 px-2 rounded-md justify-center items-center">
                                                            <SiGooglemeet className="text-sm" />
                                                            <p className="text-sm font-semibold">join</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-l-4 border-gray-200 pl-2">
                                                <div className="flex items-center shadow-md border rounded-md gap-3 p-3 bg-[#fff] h-[50px] justify-between">
                                                    <div>
                                                        <p className="text-sm text-blue-gray-800">MERN Stack</p>
                                                        <p className="text-xs text-blue-gray-800">12.00 pm</p>
                                                    </div>
                                                    <div>
                                                        <div className="flex gap-2 cursor-pointer bg-gray-200 px-2 rounded-md justify-center items-center">
                                                            <SiGooglemeet className="text-sm" />
                                                            <p className="text-sm font-semibold">join</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-l-4 border-gray-200 pl-2">
                                                <div className="flex items-center shadow-md border rounded-md gap-3 p-3 bg-[#fff] h-[50px] justify-between">
                                                    <div>
                                                        <p className="text-sm text-blue-gray-800">MERN Stack</p>
                                                        <p className="text-xs text-blue-gray-800">12.00 pm</p>
                                                    </div>
                                                    <div>
                                                        <div className="flex gap-2 cursor-pointer bg-gray-200 px-2 rounded-md justify-center items-center">
                                                            <SiGooglemeet className="text-sm" />
                                                            <p className="text-sm font-semibold">join</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex p-5">
                                        <div className="w-[30%]">
                                            <p className="text-sm text-blue-gray-800">Tommorow Jun 25</p>
                                        </div>
                                        <div className="w-[60%] flex flex-col gap-3">
                                            <div className="border-l-4 border-gray-200 pl-2">
                                                <div className="flex items-center shadow-md border rounded-md gap-3 p-3 bg-[#fff] h-[50px] justify-between">
                                                    <div>
                                                        <p className="text-sm text-blue-gray-800">MERN Stack</p>
                                                        <p className="text-xs text-blue-gray-800">12.00 pm</p>
                                                    </div>
                                                    <div>
                                                        <div className="flex gap-2 cursor-pointer bg-gray-200 px-2 rounded-md justify-center items-center">
                                                            <SiGooglemeet className="text-sm" />
                                                            <p className="text-sm font-semibold">join</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-l-4 border-gray-200 pl-2">
                                                <div className="flex items-center shadow-md border rounded-md gap-3 p-3 bg-[#fff] h-[50px] justify-between">
                                                    <div>
                                                        <p className="text-sm text-blue-gray-800">MERN Stack</p>
                                                        <p className="text-xs text-blue-gray-800">12.00 pm</p>
                                                    </div>
                                                    <div>
                                                        <div className="flex gap-2 cursor-pointer bg-gray-200 px-2 rounded-md justify-center items-center">
                                                            <SiGooglemeet className="text-sm" />
                                                            <p className="text-sm font-semibold">join</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-wrap justify-between items-start gap-3 max-w-[1000px] mx-auto">
                            <div className="flex flex-col gap-3 p-4 border rounded shadow-lg w-full max-w-xs">
                                <div className="flex justify-start w-full gap-1 text-sm font-semibold text-blue-gray-800 items-center">
                                    <FaUserTie />
                                    <p>Profile</p>
                                </div>
                                {
                                    userProfile && profile.companyName != "" ? (
                                        <div className="p-4 bg-white rounded-lg ">
                                            <p className="text-xl font-bold text-gray-800">Name: {userName}</p>
                                            <p className="text-sm text-gray-600">Email: {userEmail}</p>
                                            <h3 className="mt-3 font-semibold text-gray-700 border-b pb-2 mb-2">Company Info</h3>
                                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                                <div>
                                                    <p className="font-semibold text-gray-800">Company Name:</p>
                                                    <p>{profile?.companyName}</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">Industry:</p>
                                                    <p>{profile?.industry}</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">Headquarters:</p>
                                                    <p>{profile?.headquarters}</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">CEO:</p>
                                                    <p>{profile?.ceo}</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">Founded:</p>
                                                    <p>{profile?.founded}</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">Number of Employees:</p>
                                                    <p>{profile?.employees}</p>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">Revenue:</p>
                                                    <p>{profile?.revenue}</p>
                                                </div>
                                            </div>
                                            <button className="text-blue-500 hover:underline mt-4">View More</button>
                                        </div>
                                    ) : (
                                        <div className="w-full flex flex-col items-center py-10">
                                            <img src="/404-5.png" alt="404" />
                                            <div className="flex flex-col justify-center items-center">
                                                <h3 className="text-lg font-semibold text-blue-gray-600">Whoops!!</h3>
                                                <p className="text-sm text-blue-gray-600">Profile not updated</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="flex flex-col gap-3 p-4 border rounded shadow-lg w-full max-w-xs">
                                <div className="flex justify-start w-full gap-1 text-sm font-semibold text-blue-gray-800 items-center">
                                    <LuMessagesSquare />
                                    <p>Chats</p>
                                </div>
                                <div className="flex flex-col">
                                    {
                                        (people && people.length != 0) ?
                                            people.map((eachPerson: People) => (
                                                <>
                                                    <div
                                                        key={eachPerson.id}
                                                        className="flex justify-between items-center px-4 py-3 border-b hover:bg-[#f0f5f5] cursor-pointer">
                                                        <div className="flex justify-between items-center gap-2">
                                                            <div className="bg-[#c6f2f2] w-10 h-10 flex items-center justify-center rounded-full">
                                                                {
                                                                    userRole == "applicant" ? (
                                                                        <p className="text-sm text-white">{eachPerson.item.user2_name.charAt(0).toUpperCase()}</p>
                                                                    ) : (
                                                                        <p className="text-sm text-white">{eachPerson.item.user1_name.charAt(0).toUpperCase()}</p>
                                                                    )
                                                                }
                                                            </div>
                                                            <div>
                                                                {
                                                                    userRole == "applicant" ? (
                                                                        <h2 className="text-sm font-semibold text-black">{eachPerson.item.user2_name}</h2>
                                                                    ) : (
                                                                        <h2 className="text-sm font-semibold text-black">{eachPerson.item.user1_name}</h2>
                                                                    )
                                                                }
                                                                <p className="text-sm text-blue-gray-600">{eachPerson.item.chat[eachPerson.item.chat.length - 1]?.message}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col justify-center items-center gap-2">
                                                            <div>
                                                                {eachPerson.item.chat[eachPerson.item.chat.length - 1]?.time && (
                                                                    <p className="text-[#2fdee4] font-semibold text-xs">
                                                                        {formatDateAndTime(eachPerson.item.chat[eachPerson.item.chat.length - 1]?.time).timeString}
                                                                    </p>
                                                                )}
                                                            </div>

                                                            <div className="bg-[#c6f2f2] rounded-full w-5 h-5 flex items-center justify-center">
                                                                <p className="text-xs">1</p>
                                                            </div>
                                                        </div>
                                                    </div >
                                                </>
                                            )) :
                                            <>
                                                <div className="w-full pt-20">
                                                    <img src="/404-1.png" alt="404" />
                                                    <div className="flex flex-col justify-center items-center">
                                                        <h3 className="text-lg font-semibold text-blue-gray-600">Whoops!!</h3>
                                                        <p className="text-sm text-blue-gray-600">No connections</p>
                                                    </div>
                                                </div>
                                            </>
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 p-4 border rounded shadow-lg w-full max-w-xs">
                                <div className="flex justify-start w-full gap-1 text-sm font-semibold text-blue-gray-800 items-center">
                                    <IoNotifications />
                                    <p>Notifications</p>
                                </div>
                                {
                                    (notifications && notifications.length != 0) ?
                                        [...notifications].reverse().map((eachNotification: Notification) => (
                                            <>
                                                <div
                                                    key={eachNotification.id}
                                                    className="flex justify-between items-center px-4 py-3 border-b hover:bg-[#f0f5f5] cursor-pointer">
                                                    <div className="flex justify-between items-center gap-2">
                                                        <div>
                                                            <div className="bg-[#c6f2f2] w-10 h-10 flex items-center justify-center rounded-full relative">
                                                                <p className="text-md text-white">{eachNotification.item.type.charAt(0).toUpperCase()}</p>
                                                                {eachNotification.item.read ?
                                                                    <></> :
                                                                    <GiPlainCircle className="text-[#2fdee4] text-sm absolute -top-[0.05rem] -left-[0.05rem]" />
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="w-[70%]">
                                                            <h2 className="text-sm font-semibold text-black">{eachNotification.item.type}</h2>
                                                            <p className="text-sm text-blue-gray-600">{eachNotification.item.message}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[#2fdee4] font-semibold text-xs">{formatDateAndTime(eachNotification.item.createdAt).timeString}</p>
                                                            <p className="text-[#2fdee4] font-semibold text-xs">{formatDateAndTime(eachNotification.item.createdAt).dateString}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )) :
                                        <>
                                            <div className="w-full pt-20">
                                                <img src="/404-1.png" alt="404" />
                                                <div className="flex flex-col justify-center items-center">
                                                    <h3 className="text-lg font-semibold text-blue-gray-600">Whoops!!</h3>
                                                    <p className="text-sm text-blue-gray-600">No notifications</p>
                                                </div>
                                            </div>
                                        </>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Mainbody