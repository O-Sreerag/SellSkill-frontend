import { useEffect, useState } from "react";
import { api } from "../../services/axios";
import Chat from './chat'

import { HiDotsVertical } from "react-icons/hi";
import { FaAnglesRight } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

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

interface ContentProps {
    role: string;
}

const Content = ({ role }: ContentProps) => {
    const [selectedWindow, setSelectedWindow] = useState("people") // chat or people
    const [people, setPeople] = useState<People[]>([])
    const [selectedPerson, setSelectedPerson] = useState<People | null>(null)

    const handlePersonsChat = (eachPerson: People) => () => {
        console.log("handlePersonChat")
        console.log(eachPerson)

        setSelectedPerson(eachPerson)
        setSelectedWindow("chat")
    }

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


    return (
        <div className="w-full">
            <div className="flex justify-between px-3 py-5 items-center">
                <h2>Messages</h2>
                <div className="flex gap-3 items-center">
                    <div className="cursor-pointer">
                        <FaAnglesRight className="text-lg text-gray-700" />
                    </div>
                    <div className="cursor-pointer">
                        <HiDotsVertical className="text-gray-700" />
                    </div>
                </div>
            </div>
            {
                selectedWindow == "people" ? (
                    <div className="w-full">
                        <div className="flex flex-col h-[550px]">
                            <div className="p-4 py-3">
                                <div className="h-10 align-baseline bg-white shadow-sm border rounded-full flex gap-1 items-center px-2 text-gray-700">
                                    <div>
                                        <IoSearch />
                                    </div>
                                    <p>search</p>
                                </div>
                            </div>
                            {
                                (people && people.length != 0) ?
                                    people.map((eachPerson: People) => (
                                        <>
                                            <div
                                                key={eachPerson.id}
                                                className="flex justify-between items-center px-4 py-3 border-b hover:bg-[#f0f5f5] cursor-pointer"
                                                onClick={handlePersonsChat(eachPerson)}>
                                                <div className="flex justify-between items-center gap-2">
                                                    <div className="bg-[#c6f2f2] w-10 h-10 flex items-center justify-center rounded-full">
                                                        {
                                                            role == "applicant" ? (
                                                                <p className="text-sm text-white">{eachPerson.item.user2_name.charAt(0).toUpperCase()}</p>
                                                            ) : (
                                                                <p className="text-sm text-white">{eachPerson.item.user1_name.charAt(0).toUpperCase()}</p>
                                                            )
                                                        }
                                                    </div>
                                                    <div>
                                                        {
                                                            role == "applicant" ? (
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
                                            </div>
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
                ) : (
                    <Chat selectedPerson={selectedPerson} role={role} />
                )
            }
        </div>
    )
}

export default Content


// const samplePeople = [
//     { _id: "1", name: "sreerag" },
//     { _id: "2", name: "jojo" },
//     { _id: "3", name: "jon" },
//     { _id: "4", name: "kirk" },
// ]
// setPeople(samplePeople.map((item: { _id: string; name: string }, index: number) => ({
//     id: index + 1,
//     _id: item._id,
//     name: item.name,
// })));