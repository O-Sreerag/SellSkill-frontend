import { useEffect, useState } from "react";
import { api } from "../../services/axios";

import { HiDotsVertical } from "react-icons/hi";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { GiPlainCircle } from "react-icons/gi";

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

interface ContentProps {
  role: string;
}

const Content = ({ role }: ContentProps) => {
  const [selectedWindow, setSelectedWindow] = useState("list") // list or details
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)

  const handleNotificationsNotifications = (eachNotification: Notification) => () => {
    console.log("handleNotificationNotifications")
    console.log(eachNotification)

    setSelectedNotification(eachNotification)
    setSelectedWindow("details")
  }

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
  }, [role]);

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
        <h2>Notifications</h2>
        <div className="flex gap-3 items-center">
          <div className="cursor-pointer">
            <FaAnglesRight className="text-lg text-gray-700" />
          </div>
          <div className="cursor-pointer">
            <HiDotsVertical className="text-gray-700" />
          </div>
        </div>
      </div>
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
            (notifications && notifications.length != 0) ?
              [...notifications].reverse().map((eachNotification: Notification) => (
                <>
                  <div
                    key={eachNotification.id}
                    className="flex justify-between items-center px-4 py-3 border-b hover:bg-[#f0f5f5] cursor-pointer"
                    onClick={handleNotificationsNotifications(eachNotification)}>
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
                  <img src="/public/404-1.png" alt="404" />
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
  )
}

export default Content