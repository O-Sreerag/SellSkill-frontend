import Team from "./main/team"
import Zoom from "./main/zoom"

import { FaUserTie } from "react-icons/fa";
import { IoLink } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import { FaVideoSlash } from "react-icons/fa6";
import { IoMic } from "react-icons/io5";
import { IoMicOff } from "react-icons/io5";
import { FcEndCall } from "react-icons/fc";
import { IoHandLeftSharp } from "react-icons/io5";
import { IoHandLeftOutline } from "react-icons/io5";
import { MdAddReaction } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";

const Content = () => {

  return (
    <div className="w-full h-screen flex justify-center py-3 bg-gray-100">
      <div className="max-w-[1200px] lg:min-w-[1200px] bg-white rounded-md flex-col flex justify-around items-center border border-gray-300 shadow-md">
        <div className="flex flex-col justify-between w-full lg:min-h-[700px] px-5 space-y-1">
          <div className="h-[60px] flex justify-center items-center">
            <div className="w-full p-1 flex justify-between">
              <div className="flex gap-3 items-center">
                <img src="/public/logo.png" alt="logo" width={30} />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Weekly Report - Marketing + Sales</p>
                  <p className="text-xs text-gray-700">Friday, Jan 01 2023</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex gap-2 rounded-full bg-blue-50 border-blue-500 border text-blue-500 px-3 py-[0.3rem] items-center">
                  <p className="text-xs">jkl-mkp-xrt</p>
                  <IoLink className="text-sm" />
                </div>
                <div>
                  <FaUserTie className="text-gray-700 border rounded-full border-gray-800 text-2xl" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full h-full justify-between space-x-2">
            <div className="flex flex-col justify-between w-4/5">
              <div className="h-full">
                <div className="bg-[#f5f8fa] rounded-md h-full flex flex-col">
                  <div className="h-3/4">
                    <Zoom />
                  </div>
                  <div className="h-1/4 justify-center">
                    <Team />
                  </div>
                </div>
              </div>
              <div className="h-[70px] flex justify-center items-center">
                <div className="space-x-5 p-1">
                  <button><MdAddReaction className="text-blue-500 text-3xl" /></button>
                  <button><FaVideo className="text-red-500 text-3xl bg-red-100 p-1 border-red-500 border rounded-full" /></button>
                  <button><FcEndCall className="text-red-500 text-3xl bg-red-100 p-1 border-red-500 border rounded-full" /></button>
                  <button><IoMic className="text-red-500 text-3xl bg-red-100 p-1 border-red-500 border rounded-full" /></button>
                  <button><IoHandLeftOutline className="text-blue-700 bg-blue-50 p-1 border border-blue-500 text-3xl rounded-full" /></button>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between w-1/5">
              <div className="h-full">
                <div className="bg-[#f5f8fa] flex flex-col justify-between h-full rounded-lg">
                  <div className="flex p-[0.3rem] bg-[#f1f2f3] #e5eff6 w-full rounded-t-lg">
                    <button className="w-1/2 bg-white shadow-sm rounded-md"><p className="p-[0.2rem] text-gray-600 text-sm">participants</p></button>
                    <button className="w-1/2"><p className=" p-[0.2rem] text-gray-700 text-sm">chat</p></button>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="h-[70px] flex justify-center items-center">
                <div className="flex justify-between p-[0.3rem] bg-[#f5f8fa] w-full gap-1 rounded-lg">
                  <button className=""><BiDotsVerticalRounded className="text-gray-800"/></button>
                  <div className="flex justify-start w-full"><p className=" p-[0.2rem] text-gray-700 text-xs">type something...</p></div>
                  <button className="w-7 bg-white rounded-full items-center flex justify-center"><IoIosSend /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content