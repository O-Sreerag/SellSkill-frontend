import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
    const [toggle, setToggle] = useState(false)

  return (
    <div className='bg-[#fff] border-b-2 px-2 w-full shadow-sm fixed top-0 z-10'>
        <div className=" text-black pl-4 pr-4 items-center flex justify-between mx-auto">
            <div className="flex p-2">
                <img
                    src="/public/41fe38e8-4d1f-4c1f-97cd-046179a556e1.png"
                    alt="logo"
                    width={100}
                    // height={40}
                />
            </div>

            {
                toggle ? 
                <IoClose onClick={() => {setToggle(!toggle)}}  className="text-black text-2xl md:hidden block"/>
                :
                <AiOutlineMenu onClick={() => {setToggle(!toggle)}} className="text-black text-2xl md:hidden block"/>
            }
            <ul className="hidden md:flex text-black gap-10">
                <li>
                    home
                </li>
                <li>
                    company
                </li>
                <li>
                    resources
                </li>
                <li>
                    about
                </li>
            </ul>
            <ul className={`duration-500 md:hidden w-full h-screen text-black fixed bg-white top-[95px]
                           ${toggle ?  'left-[0]' : 'left-[-100%]' }`}>
                <li className="p-3">
                    home
                </li>
                <li className="p-3">
                    company
                </li>
                <li className="p-3">
                    resources
                </li>
                <li className="p-3">
                    about
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar