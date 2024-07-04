import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppRootState } from '../../redux/store';

import { FaUserTie } from "react-icons/fa";

interface NavbarProps {
    items: { label: string; href: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const navigate = useNavigate()
    const [showInfo, setShowInfo] = useState("hidden")

    const { userName = "", userEmail = "" } = useSelector((state: AppRootState) => state.user)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            setScrollPosition(scrollTop);
            if (scrollTop > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleGoto = (to: string) => () => {
        navigate(`/${to}`)
    }

    const handleInfoOnClick = () => {
        console.log(showInfo)
        if (showInfo == "hidden") {
            setShowInfo('tap')
        } else if (showInfo == "tap") {
            setShowInfo('hidden')
        } else if (showInfo == "hover") {
            setShowInfo('tap')
        }
    }

    const handleLogout = () => {
    }

    return (
        <nav className='relative flex justify-center'>
            <div className={`fixed z-20 transition-all duration-1000
                    ${isScrolled ? ' py-2.5 px-4 top-5 rounded-2xl w-[62%] bg-white shadow-md' : 'px-36 py-10 w-full'}`}
                style={{ maxHeight: `${isScrolled && scrollPosition > 30 ? '65px' : 'unset'}` }}>

                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-shrink-0 text-gray-800 mr-6 gap-1">
                        <img src="/logo.png" alt="logo" width={23} />
                        <span className="font-semibold text-xl tracking-tight">SellSkill</span>
                    </div>
                    <div className="flex">
                        {items.map((item, index) => (
                            <a key={index} href={item.href} className={`text-gray-600 px-3 py-1 rounded-md text-xs font-semibold hover:bg-gray-200`}>
                                {item.label}
                            </a>
                        ))}
                    </div>
                    {
                        userName == "" ? (
                            <>
                                <div className="flex items-center flex-shrink-0 text-gray-800 gap-3">
                                    <button className='bg-black hover:bg-gray-800 text-white font-semibold px-5 py-1 rounded-md'
                                        onClick={handleGoto("login")}>
                                        <p>login</p>
                                    </button>
                                    <button className={`text-black border font-semibold px-4 py-1 rounded-md hover:bg-gray-200 shadow-md`}
                                        onClick={handleGoto("signup")}>
                                        <p>signup</p>
                                    </button>
                                </div>
                            </>) : (
                            <div className='relative'
                                onClick={handleInfoOnClick}
                                onMouseEnter={() => { showInfo == "hidden" ? setShowInfo("hover") : setShowInfo("tap") }}
                                onMouseLeave={() => { showInfo == "tap" ? setShowInfo("tap") : setShowInfo("hidden") }}>
                                <div className=" flex items-center flex-shrink-0 text-gray-800 gap-1 hover:bg-gray-200 px-2 py-1 rounded-full cursor-pointer border">
                                    <div className='flex flex-col'>
                                        <div ><p className='text-gray-600 text-xs font-semibold'>{userName}</p></div>
                                        <div><p className='text-gray-600 text-xs font-semibold'>{userEmail}</p></div>
                                    </div>
                                    <div className='border border-gray-500 rounded-full p-1'>
                                        <FaUserTie className='rounded-full text-gray-800 text-2xl' />
                                    </div>
                                </div>
                                {(showInfo == "tap" || showInfo == "hover") && (
                                    <div className={`absolute top-12 left-8`} id="infoCard">
                                        <div className="bg-white shadow-md rounded-md p-2">
                                            <div>
                                                <p className="text-gray-600 text-sm">{userName}</p>
                                                <p className="text-gray-600 text-sm">{userEmail}</p>
                                                <hr className='mt-2' />
                                                <button onClick={handleLogout} className="bg-red-50 text-red-700 text-sm py-1 rounded-md mt-2 w-full">Logout</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>)
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;