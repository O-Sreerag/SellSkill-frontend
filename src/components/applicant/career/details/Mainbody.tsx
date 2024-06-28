import { useEffect, useState } from 'react'
import Navbar2 from '../../Navbar2'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../../../../services/axios'

import { RxCross2 } from 'react-icons/rx'
import { IoIosArrowDropdown, IoMdArrowDropdown } from 'react-icons/io'

interface careerData {
    _id?: string;
    recruiterId?: string;
    posting_title?: string;
    industry?: string;
    location?: string;
    salary_min?: number;
    salary_max?: number;
    workExp_min?: number;
    workExp_max?: number;
    job_type?: string;
    opening_status?: string;
    date_opened?: Date;
    target_date?: Date;
    contact_name?: string;
    no_of_positions?: number;
    job_description?: string[];
    required_skills?: string[];
    responsibilities?: string[];
    benefits?: string[];
    applicants?: string[];
    url?: string;

}

const Mainbody = () => {
    const navigate = useNavigate()
    const [isButtonTapped, setButtonTapped] = useState(false)
    const { search } = useLocation();
    const careerId = new URLSearchParams(search).get('id');
    const [career, setCareer] = useState<careerData>({})

    const handleButtonTap = () => {
        setButtonTapped(val => !val)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/career/get/${careerId}`)
                console.log(response.data)
                const data = response.data.result;
                setCareer(data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (careerId) {
            fetchData();
        } else {
            console.log("careerId is null")
        }
    }, [careerId]);

    const { pathname } = useLocation();
    const handleApplyJob = () => {
        const destination = `/applicant/career/apply?careerId=${careerId}`;

        if (pathname !== destination) {
            navigate(destination);
        }
    };

    const handleExploreMoreJobs = async () => {
        const recruiterId = career?.recruiterId
        const fetchData = async () => {
            try {
                console.log("fetching all careers from recruiter :", recruiterId)
                const response = await api.get(`/career/getAllCareersFromRecruiter/${recruiterId}`)
                console.log(response.data)
                const data = response.data.result;

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (recruiterId) {
            fetchData();
        } else {
            console.log("recruiterId is null")
        }
    }

    return (
        <div className="flex justify-center w-full bg-white">
            <div className='max-w-[1100px] lg:min-w-[1100px]'>
                <div className="items-center flex flex-col justify-between p-5">
                    <Navbar2 />

                    <div className="w-full space-y-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#2B2B2E] justify-start barlow-regular">Event / Meet Management</h2>
                        <p className="text-gray-600">Change status, archive and do more on events.</p>
                    </div>

                    <div className='w-full'>
                        <p className="text-gray-600 text-base md:text-base mt-10 italic text-left">apply for the job from your url</p>
                        <div className={`mt-6 bg-white rounded-md transition-all duration-1000 shadow-md`}>
                            <div className="bg-blue-500 border-white border-[4px] rounded-lg p-6">
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
                                            <p className="text-sm">Status: <span className="font-semibold">Open</span></p>
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
                                            <div className="cursor-pointer text-gray-800 text-center font-semibold italic hover:underline" onClick={handleApplyJob}>
                                                apply now
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )
                            }
                        </div>
                        <div className='w-full justify-center flex'>
                            <a className="text-gray-600 text-base md:text-base mt-5 italic">explore more jobs from
                                <span className="text-lg font-semibold text-pink-500 cursor-pointer underline" onClick={handleExploreMoreJobs}> Konisagg Developing and consulting Tech</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Mainbody