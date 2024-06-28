import React, { useState } from 'react'
import { AppRootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import { FaUserTie } from 'react-icons/fa'

const Navbar2 = () => {
    const { adminEmail = 'email' } = useSelector((state: AppRootState) => state.admin)
    const [showInfo, setShowInfo] = useState("hidden")

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
        <div className="w-full mb-20 flex justify-end">
            <div className='flex gap-2 p-1 items-center'>
                <div className="flex gap-2 text-sm font-sans align-middle items-center py-1 px-3 rounded-full border border-gray-700">
                    <FaUserTie className='text-gray-700 border-black border rounded-full' />
                    <h2 className="text-sm text-gray-700k">{adminEmail}</h2>
                </div>
                <div id="hoverCard" onClick={handleInfoOnClick} onMouseEnter={() => { showInfo == "hidden" ? setShowInfo("hover") : setShowInfo("tap") }} onMouseLeave={() => { showInfo == "tap" ? setShowInfo("tap") : setShowInfo("hidden") }} className='hover:ring-2 hover:ring-gray-300 rounded-full px-[9px] py-[3px] cursor-pointer text-sm bg-gray-400 text-white'>{adminEmail.charAt(0).toUpperCase()}</div>
            </div>
            {(showInfo == "tap" || showInfo == "hover") && (
                <div className={`absolute top-14`} id="infoCard">
                    <div className="bg-white shadow-md rounded-md p-2">
                        <div>
                            <p className="text-gray-600 text-sm">{adminEmail}</p>
                            <hr className='mt-2' />
                            <button onClick={handleLogout} className="bg-red-50 text-red-700 text-sm py-1 rounded-md mt-2 w-full">Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar2