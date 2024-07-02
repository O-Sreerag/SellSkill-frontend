import { useSelector } from "react-redux"
import { AppRootState } from "../../../redux/store"
import Navbar2 from "../Navbar2"
import { ImProfile } from "react-icons/im"
import './Mainbody.css'
import { SiGooglemeet } from "react-icons/si"
import { FaUserTie } from "react-icons/fa"
import { IoNotifications } from "react-icons/io5"
import { LuMessagesSquare } from "react-icons/lu"

const Mainbody = () => {
    const { userName = 'name' } = useSelector((state: AppRootState) => state.user)

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
                                <div className="flex-col flex rounded-lg bg-pink-50 w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-pink-300 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div>
                                <div className="flex-col flex rounded-lg bg-[#fff] w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-gray-200 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div>
                                <div className="flex-col flex rounded-lg bg-[#fff] w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-gray-200 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div>
                                <div className="flex-col flex rounded-lg bg-[#fff] w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-gray-200 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div>
                                <div className="flex-col flex rounded-lg bg-[#fff] w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-gray-200 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div>
                                <div className="flex-col flex rounded-lg bg-[#fff] w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-gray-200 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div>
                                <div className="flex-col flex rounded-lg bg-[#fff] w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-gray-200 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div>
                                <div className="flex-col flex rounded-lg bg-[#fff] w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-gray-200 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div>
                                <div className="flex-col flex rounded-lg bg-[#fff] w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-gray-200 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div>
                                <div className="flex-col flex rounded-lg bg-[#fff] w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-gray-200 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div>
                                <div className="flex-col flex rounded-lg bg-[#fff] w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-gray-200 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div>
                                <div className="flex-col flex rounded-lg bg-[#fff] w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-gray-200 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div>
                                <div className="flex-col flex rounded-lg bg-[#fff] w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-gray-200 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div>
                                <div className="flex-col flex rounded-lg bg-[#fff] w-[150px] h-[120px] flex-shrink-0 cursor-pointer hover:-translate-y-2 shadow-md">
                                    <div className="h-[30%] bg-gray-200 rounded-t-lg">
                                        <div className="ml-3 mt-7">
                                            <ImProfile className="text-md" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p>card 1</p>
                                        <p>ldjhfk;shc </p>
                                    </div>
                                </div>
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

                        <div className="w-full flex justify-between items-center gap-3 max-w-[1000px]">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-start w-full gap-1 pl-8 text-sm font-semibold text-blue-gray-800 items-center">
                                    <FaUserTie />
                                    <p>Profile</p>
                                </div>
                                <div></div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-start w-full gap-1 pl-8 text-sm font-semibold text-blue-gray-800 items-center">
                                    <LuMessagesSquare />
                                    <p>Chats</p>
                                </div>
                                <div></div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-start w-full gap-1 pl-8 text-sm font-semibold text-blue-gray-800 items-center">
                                    <IoNotifications />
                                    <p>Notifications</p>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Mainbody