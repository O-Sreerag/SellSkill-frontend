import { useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { IoIosArrowDropdown } from "react-icons/io"

const Mainbody = () => {
    const [isButtonTapped, setButtonTapped] = useState(false)

    const handleButtonTap = () => {
        setButtonTapped((val: any) => !val)
    }

    return (
        <div className="flex justify-center w-full bg-white">
            <div className='max-w-[1100px] lg:min-w-[1100px] border-x-4 border-x-pink-50 w-full'>
                <div className="items-center flex flex-col justify-between">
                    <div className="flex w-full bg-white gap-1 min-h-[600px]">
                        <div className="bg-[#f5f8fa] border-r-4 border-r-pink-50 w-full p-2"></div>
                        <div className=" border-l-4 border-l-pink-50 w-full p-2">
                            <div className={`mt-6 bg-white rounded-md transition-all duration-1000 shadow-md w-full`}>
                                <div className="border-white border-[4px] rounded-lg p-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-black">MERN Stack developer (jnr)</h3>
                                        <h3 className="text-lg font-semibold text-[#dcfc44] cursor-pointer hover:underline">Konisagg Developing and consulting Tech</h3>
                                        <div className="flex">
                                            <div className="mt-4 text-black grid grid-cols-3 gap-2 w-[95%]">
                                                <p className="text-sm">Experience: 1 - 3 yrs</p>
                                                <p className="text-sm">Package: 7 - 8 LPA</p>
                                                <p className="text-sm">Vacancies: 4 prs</p>
                                                <p className="text-sm">Job type: Full time</p>
                                                <p className="text-sm">Work from home available</p>
                                                <p className="text-sm">Status: <span className="text-black font-semibold">Open</span></p>
                                            </div>
                                            <div className="w-[5%] flex items-end justify-end">
                                                {isButtonTapped ? (
                                                    <RxCross2
                                                        className={`w-8 h-8 cursor-pointer text-black`}
                                                        onClick={handleButtonTap}
                                                    />
                                                ) : (
                                                    <IoIosArrowDropdown
                                                        className={`w-8 h-8 cursor-pointer text-black`}
                                                        onClick={handleButtonTap}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    isButtonTapped ? (
                                        <div className={`p-6`}>
                                            <div>
                                                <div className="mt-4 grid grid-cols-2 gap-2 w-[95%]">
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                                                        <ul className="p-5 list-disc text-gray-800 text-sm">
                                                            <li className="mb-2">We are looking for a passionate MERN Stack Developer to join our team.</li>
                                                            <li className="mb-2">In this role, you will be responsible for developing and maintaining web applications using the MERN stack (MongoDB, Express.js, React, Node.js).</li>
                                                            <li className="mb-2">You should have a strong understanding of JavaScript, React.js, and Node.js, and experience with MongoDB or other NoSQL databases.</li>
                                                            <li className="mb-2">Experience with GraphQL, Redux, or TypeScript is a plus.</li>
                                                            <li className="mb-2">The ideal candidate should be detail-oriented, have excellent problem-solving skills, and be able to work independently as well as part of a team.</li>
                                                            <li className="mb-2">Strong communication skills and the ability to collaborate effectively with other developers and stakeholders are essential.</li>
                                                            <li className="mb-2">This is a full-time position based in New York City. Remote work options are available.</li>
                                                            <li className="mb-2">If you are passionate about web development and want to work on exciting projects in a dynamic and collaborative environment, we would love to hear from you!</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-3">Skills Required</h3>
                                                        <ul className="text-gray-800 text-sm">
                                                            <li className="mb-2">Strong understanding of JavaScript, React.js, and Node.js</li>
                                                            <li className="mb-2">Experience with MongoDB or other NoSQL databases</li>
                                                            <li className="mb-2">Knowledge of GraphQL, Redux, or TypeScript is a plus</li>
                                                            <li className="mb-2">Excellent problem-solving skills</li>
                                                            <li className="mb-2">Strong communication and collaboration skills</li>
                                                        </ul>
                                                        <div className="mt-8">
                                                            <h3 className="text-lg font-semibold mb-3">Company Information</h3>
                                                            <p className="text-gray-800 text-sm mb-2">Company:<span className="font-semibold"> Konisagg Developing and Consulting Tech</span></p>
                                                            <p className="text-gray-800 text-sm mb-2">Location:<span className="font-semibold"> New York, NY</span></p>
                                                            <p className="text-gray-800 text-sm mb-2">Industry:<span className="font-semibold"> Technology</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Mainbody