import { IoIosArrowDropdown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { ReactTyped } from 'react-typed';
import { useState, useEffect } from "react";

const Mainbody = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isButtonTapped, setButtonTapped] = useState(false)

    const handleButtonTap = () => {
        setButtonTapped(val => !val)
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
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

    return (
        <div className="flex-1 p-10 w-full">
            <div className="max-w-[1300px] p-5 lg:p-10 mx-auto">

                <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-[#201A31] text-center leading-[1.5] ${isScrolled ? 'mt-15' : 'mt-9'} `}>Save time &<br /> money on {' '}
                    <ReactTyped
                        strings={['Job Finding', 'Job Recruiting', 'Meet Scheduling', 'Meet Conducting']}
                        typeSpeed={90}
                        backSpeed={90}
                        loop
                        className="text-brown-400 bg-white text-4xl md:text-5xl lg:text-6xl rounded-md p-2"
                    />
                </h2>
                <p className="text-black text-base md:text-xl mt-8 text-center px-[10%] lg:px-[20%]">Savings, visibility, and infrastructure guardrails. One automated platform. Leverage the power of divinity in your web</p>

                <div className="flex items-center justify-center mt-4 flex-shrink-0 text-gray-800 gap-5">
                    <button className='bg-black hover:bg-gray-800 text-white font-semibold px-8 py-2  rounded-md'>login</button>
                    <button className={`text-black border font-semibold px-7 py-2 rounded-md shadow-md hover:bg-[#abc7e3]`}>signup</button>
                </div>

                <p className="text-gray-600 text-base md:text-base mt-32 italic text-left">apply for the job from your url</p>
                <div className={`mt-6 bg-white rounded-md transition-all duration-1000 shadow-md`}>
                    <div className="bg-[#897D79] border-white border-[4px] rounded-lg p-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white">MERN Stack developer (jnr)</h3>
                            <h3 className="text-lg font-semibold text-[#dcfc44] cursor-pointer hover:underline">Konisagg Developing and consulting Tech</h3>
                            <div className="flex">
                                <div className="mt-4 text-white grid grid-cols-3 gap-2 w-[95%]">
                                    <p className="text-sm">Experience: 1 - 3 yrs</p>
                                    <p className="text-sm">Package: 7 - 8 LPA</p>
                                    <p className="text-sm">Vacancies: 4 prs</p>
                                    <p className="text-sm">Job type: Full time</p>
                                    <p className="text-sm">Work from home available</p>
                                    <p className="text-sm">Status: <span className="text-white font-semibold">Open</span></p>
                                </div>
                                <div className="w-[5%] flex items-end justify-end">
                                    {isButtonTapped ? (
                                        <RxCross2
                                            className={`w-8 h-8 cursor-pointer text-white`}
                                            onClick={handleButtonTap}
                                            />
                                    ) : (
                                        <IoIosArrowDropdown
                                            className={`w-8 h-8 cursor-pointer text-white`}
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
                                    <div className="cursor-pointer text-gray-800 text-center font-semibold italic hover:underline">
                                        apply now
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
                <p className="text-gray-600 text-base md:text-base mt-10 italic text-center">explore more jobs from 
                <span className="text-lg font-semibold text-brown-400 cursor-pointer underline"> Konisagg Developing and consulting Tech</span></p>

            </div>
        </div>
    )
}

export default Mainbody