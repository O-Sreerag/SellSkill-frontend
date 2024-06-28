import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { IoIosSend } from "react-icons/io";
import { api } from '../../services/axios';
import './content.css'

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
    user1Id: string
    user2Id: string
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

interface ChatProps {
    selectedPerson: People | null
    role: string
}

const Chat: React.FC<ChatProps> = ({ selectedPerson, role }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (selectedPerson) {
            console.log("selectedPerson changed")

            setMessages(selectedPerson.item.chat)

            const newSocket = io('http://sellskill.online');
            setSocket(newSocket);

            newSocket.emit('join', selectedPerson.item._id);

            newSocket.on('chatHistory', (chatHistory: MessageData[]) => {
                setMessages(chatHistory);
            });

            newSocket.on('message', (data: MessageData) => {
                console.log("message recieved :", data)
                console.log(data.from, selectedPerson.item.user1Id)
                if(role == "applicant" && data.from.id != selectedPerson.item.user1Id) {
                    setMessages((prevMessages) => [...prevMessages, data]);
                }
                if(role == "recruiter" && data.from.id != selectedPerson.item.user2Id) {
                    setMessages((prevMessages) => [...prevMessages, data]);
                }
            });

            return () => {
                newSocket.disconnect();
            };
        }
    }, [selectedPerson]);

    const sendMessage = async () => {
        if (message.trim() && selectedPerson && role && socket) {
            let fromUser, toUser
            if (role == "applicant") {
                fromUser = { name: selectedPerson.item.user1_name, id: selectedPerson.item.user1Id, role: "applicant" }
                toUser = { name: selectedPerson.item.user2_name, id: selectedPerson.item.user2Id, role: "recruiter" }
            } else if (role == "recruiter") {
                fromUser = { name: selectedPerson.item.user2_name, id: selectedPerson.item.user2Id, role: "recruiter" }
                toUser = { name: selectedPerson.item.user1_name, id: selectedPerson.item.user1Id, role: "applicant" }
            }
            const msgData = {
                room: selectedPerson.item._id,
                message,
                status: 'sent',
                time: new Date(),
                from: fromUser,
                to: toUser,
            };
            socket.emit('message', msgData);
            try {
                console.log("storing message on backend")
                console.log(msgData)
                const response = await api.post(`/chat/room/newMessage`, msgData)
                console.log(response.data)
                const data = response.data.result;
                console.log(data)
            } catch (error) {
                console.log("failed to send messge :", error)
            }
            console.log("message emitted", msgData)
            setMessages((prevMessages) => [...prevMessages, msgData]);
            setMessage('');
        }
    };

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
        <div className="px-4 w-full">
            <div className="flex flex-col bg-white border justify-between h-[550px] rounded-md">
                <div
                    key={selectedPerson?.item._id}
                    className="flex gap-2 items-center p-2 border-b cursor-pointer">
                    <div className="bg-gray-300 w-10 h-10 flex items-center justify-center rounded-full">
                        {
                            role == "applicant" ? (
                                <p className="text-md text-white">{selectedPerson?.item.user2_name.charAt(0).toUpperCase()}</p>
                            ) : (
                                <p className="text-md text-white">{selectedPerson?.item.user1_name.charAt(0).toUpperCase()}</p>
                            )
                        }
                    </div>
                    <div>
                        {
                            role == "applicant" ? (
                                <h2 className="text-md font-semibold text-black">{selectedPerson?.item.user2_name}</h2>
                            ) : (
                                <h2 className="text-md font-semibold text-black">{selectedPerson?.item.user1_name}</h2>
                            )
                        }
                        <p className="text-sm">online</p>
                    </div>
                </div>
                <div className="messages flex flex-col gap-2 h-full p-2 overflow-y-scroll">
                    {messages.map((msg, index) => (
                        <div className={`w-full flex ${role == msg.from.role ? 'justify-end' : 'justify-start'}`}>
                            {
                                role == msg.from.role ? (
                                    <div className='w-[60%]'>
                                        <div key={index} className="message bg-[#f0f5f5]  rounded-lg rounded-br-none p-2">
                                            <p className='text-sm'>{msg.message}</p>
                                        </div>
                                        <div className='text-xs'>
                                            <p>{formatDateAndTime(msg.time).timeString}</p>
                                            {/* <p>{formatDateAndTime(msg.time).dateString}</p> */}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='w-[60%]'>
                                        <div key={index} className="message bg-[#c6f2f2] rounded-lg rounded-bl-none p-2">
                                            <p className='text-sm text-[#2fdee4]'>{msg.message}</p>
                                        </div>
                                        <div className='text-xs'>
                                            <p>{formatDateAndTime(msg.time).timeString}</p>
                                            {/* <p>{formatDateAndTime(msg.time).dateString}</p> */}
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    ))}
                </div>
                <div className="message-input bg-[#f0f5f5] p-2 rounded-b-md flex items-center justify-between">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className='py-2 px-4 w-[85%] bg-white rounded-full text-sm focus:outline-none'
                    />
                    <button
                        className='w-8 h-8 bg-white rounded-full flex items-center justify-center'
                        onClick={sendMessage}>
                        <IoIosSend className='text-[#2fdee4] text-lg' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;