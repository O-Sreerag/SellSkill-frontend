import { useLocation, useNavigate } from "react-router-dom";

import { FaPlus } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { FiHome } from "react-icons/fi";
import { SiGooglemeet } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { FaUserTie } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const navigate = useNavigate()

  const { pathname } = useLocation();
  const handleCreate = () => {
      const destination = '/recruiter/career/create';
  
      if (pathname !== destination) {
          navigate(destination);
      }
  }

  return (
    <div className="fixed left-0 flex h-full w-60 flex-col border-r bg-white">
      <div className="flex-grow overflow-y-auto overflow-x-hidden">
        <ul className="flex flex-col space-y-1 py-4">

          <li className="px-5 mb-3">
            <div className="flex items-center flex-shrink-0 text-gray-800 gap-1">
              <img src="/public/logo.png" alt="logo" width={23} />
              <span className="font-semibold text-xl tracking-tight">SellSkill</span>
            </div>
          </li>

          <hr className="bg-gray-200 p-[0.5px]" />

          <li>
            <ul className="space-y-1">
              <li>
                <a href="#" className={`relative flex h-9 flex-row items-center border-l-4  pr-6 ${activePage == 'profile' ? 'border-pink-500 bg-[#f5f8fa] text-gray-800' : "border-transparent text-gray-600"} hover:bg-[#f5f8fa] hover:border-pink-200 hover:shadow-sm hover:text-gray-800 focus:outline-none`}>
                  <span className="ml-5 inline-flex items-center justify-center">
                    <FaUserTie />              </span>
                  <span className="ml-2 truncate text-sm tracking-wide">Profile</span>
                </a>
              </li>
              <li>
                <a href="#" className={`relative flex h-9 flex-row items-center border-l-4 ${activePage == 'notifications' ? 'border-pink-500 bg-[#f5f8fa] text-gray-800' : "border-transparent text-gray-600"} pr-6 hover:bg-[#f5f8fa] hover:border-pink-200 hover:shadow-sm hover:text-gray-800 focus:outline-none`}>
                  <span className="ml-5 inline-flex items-center justify-center">
                    <IoNotifications />
                  </span>
                  <span className="ml-2 truncate text-sm tracking-wide">Notifications</span>
                  <span className="ml-auto rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium tracking-wide text-red-500">1.2k</span>
                </a>
              </li>
              <li>
                <a href="#" className={`relative flex h-9 flex-row items-center border-l-4 ${activePage == 'messages' ? 'border-pink-500 bg-[#f5f8fa] text-gray-800' : "border-transparent text-gray-600"} pr-6 hover:bg-[#f5f8fa] hover:border-pink-200 hover:shadow-sm hover:text-gray-800 focus:outline-none`}>
                  <span className="ml-5 inline-flex items-center justify-center">
                    <LuMessagesSquare />
                  </span>
                  <span className="ml-2 truncate text-sm tracking-wide">Messages</span>
                  <span className="ml-auto rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium tracking-wide text-blue-700 ">New</span>
                </a>
              </li>
              <li>
                <a href="#" className={`relative flex h-9 flex-row items-center border-l-4 pr-6 hover:border-pink-200 hover:bg-[#f5f8fa] hover:shadow-sm hover:text-gray-800 focus:outline-none`}>
                  <span className="ml-5 inline-flex items-center text-red-600 justify-center">
                    <IoLogOut />
                  </span>
                  <span className="ml-2 truncate text-sm text-red-600 tracking-wide">Logout</span>
                </a>
              </li>
            </ul>
          </li>

          <li className="p-6">
            <ul className="flex flex-col space-y-1 py-4 border rounded-xl shadow-sm">
              <li className="px-3">
                <a href="#" className={` flex gap-2 h-9 flex-row align-middle items-center pr-6 ${activePage == "home" ? 'bg-[#f5f8fa] shadow-sm text-gray-800 ' : 'text-gray-700'} hover:bg-[#f5f8fa] hover:shadow-sm rounded-full hover:text-gray-800 focus:outline-none`}>
                  <span className="ml-4 inline-flex items-center justify-center">
                    <FiHome />
                  </span>
                  <span className="truncate text-sm mt-[2px] tracking-wide">Home</span>
                </a>
              </li>
              <li className="px-3">
                <a href="#" className={` flex gap-2 h-9 flex-row align-middle items-center pr-6 ${activePage == "career" ? 'bg-[#f5f8fa] shadow-sm text-gray-800 ' : 'text-gray-700'} hover:bg-[#f5f8fa] hover:shadow-sm rounded-full hover:text-gray-800 focus:outline-none`}>
                  <span className="ml-4 inline-flex items-center justify-center">
                    <ImProfile />
                  </span>
                  <span className="truncate text-sm mt-[2px] tracking-wide">Career</span>
                </a>
              </li>
              <li className="px-3">
                <a href="#" className={` flex gap-2 h-9 flex-row align-middle items-center pr-6 ${activePage == "schedules" ? 'bg-[#f5f8fa] shadow-sm text-gray-800 ' : 'text-gray-700'} hover:bg-[#f5f8fa] hover:shadow-sm rounded-full hover:text-gray-800 focus:outline-none`}>
                  <span className="ml-4 inline-flex items-center justify-center">
                    <SiGooglemeet />
                  </span>
                  <span className="truncate text-sm mt-[2px] tracking-wide">Schedules</span>
                </a>
              </li>
              <li className="px-3">
                <a href="#" className={` flex gap-2 h-9 flex-row align-middle items-center pr-6 ${activePage == "applications" ? 'bg-[#f5f8fa] shadow-sm text-gray-800 ' : 'text-gray-700'} hover:bg-[#f5f8fa] hover:shadow-sm rounded-full hover:text-gray-800 focus:outline-none`}>
                  <span className="ml-4 inline-flex items-center justify-center">
                    <PiStudentFill />
                  </span>
                  <span className="truncate text-sm mt-[2px] tracking-wide">Applications</span>
                </a>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default Sidebar;