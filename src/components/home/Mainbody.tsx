import { IoIosArrowDropdown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { ReactTyped } from 'react-typed';
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppRootState } from "../../redux/store";
import { BsClockHistory, BsSignTurnSlightRight } from "react-icons/bs";
import { api } from "../../services/axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineEventAvailable } from "react-icons/md";
import { FaGoogleWallet, FaPeopleGroup } from "react-icons/fa6";

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
    const [isScrolled, setIsScrolled] = useState(false);
    const [isButtonTapped, setButtonTapped] = useState(false)
    const navigate = useNavigate()
    const { search } = useLocation();
    const careerId = new URLSearchParams(search).get('id');
    const [career, setCareer] = useState<careerData | null>(null)

    const { userName = "", userEmail = "", userRole = "" } = useSelector((state: AppRootState) => state.user)

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("fetching career details")
                const response = await api.get(`/career/get/${careerId}`)
                console.log(response.data)

                if (response.status == 200) {
                    const data = response.data.result;
                    setCareer(data)

                    console.log("adding career to applicant")
                    const response2 = await api.post(`/career/applicant/add?careerId=${careerId}`)
                    console.log("response2")
                    console.log(response2)
                }

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

    const handleGoToCareer = () => {
        if (userEmail != "" && userRole == "applicant") {
            navigate(`/applicant/career/apply?careerId=${careerId}`);
        } else if (userEmail == "") {
            console.log("user has not login")
            toast.error(`user has not yet login`);
            navigate(`/login`);
        } else {
            console.log("role is recruiter")
            toast.error(`This action is prohibited, for recruiter`);
        }
    };

    const handleGoto = (to: string) => () => {
        navigate(`/${to}`)
    }

    return (
        <div>
            <div className="bg-[#f5f8fa]  flex-1 p-10 w-full">
                <div className="max-w-[1300px] p-5 lg:p-10 mx-auto">
                    <div className="banner relative flex items-center justify-center h-[400px]">
                        <div
                            className="absolute inset-0 bg-cover bg-center z-0"
                            style={{
                                backgroundImage: "url('/banner-1.png')",
                                backgroundSize: 'contain',
                                backgroundPosition: 'right',
                                backgroundRepeat: 'no-repeat',
                            }}
                        ></div>
                        <div className="relative text-center">
                            <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-[#201A31] text-center leading-[1.5] ${isScrolled ? 'mt-15' : 'mt-9'} `}>Save time &<br /> money on {' '}
                                <ReactTyped
                                    strings={['Job Finding', 'Job Recruiting', 'Meet Scheduling', 'Meet Conducting']}
                                    typeSpeed={90}
                                    backSpeed={90}
                                    loop
                                    className="text-pink-500 text-4xl md:text-5xl lg:text-6xl rounded-md p-2"
                                />
                            </h2>
                            <p className="text-black text-base md:text-xl mt-8 text-center px-[10%] lg:px-[20%]">Savings, visibility, and infrastructure guardrails. One automated platform. Leverage the power of divinity in your web</p>
                            {
                                userName == "" ? (
                                    <div className="flex items-center justify-center mt-4 flex-shrink-0 text-gray-800 gap-5">
                                        <button className='bg-black hover:bg-gray-800 text-white font-semibold px-8 py-2  rounded-md'
                                            onClick={handleGoto("login")}>
                                            <p>login</p>
                                        </button>
                                        <button className={`text-black border font-semibold px-7 py-2 rounded-md shadow-md hover:bg-gray-200`}
                                            onClick={handleGoto("signup")}>
                                            <p>signup</p>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center mt-4 flex-shrink-0 text-gray-800 gap-3">
                                        <p className="text-4xl font-bold">
                                            Welcome {userName}
                                        </p>
                                        <button className='bg-black hover:bg-gray-800 text-white font-semibold px-8 py-2 rounded-md flex gap-2 items-center'
                                            onClick={handleGoto(`${userRole}/dash`)}>
                                            <p>go to dashboard</p>
                                            <div>
                                                <BsSignTurnSlightRight />
                                            </div>
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#f5f8fa]  flex-1 p-10 w-full">
                <div className="max-w-[1300px] p-5 lg:p-10 mx-auto">
                </div>
            </div>

            {
                career &&
                <>
                    <div className="bg-[#edeeef]  flex-1 p-10 w-full">
                        <div className="max-w-[1300px] p-5 lg:p-10 mx-auto">
                            <p className="text-gray-600 text-base md:text-base mt-32 italic text-left">apply for the job from your url</p>
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
                                                <div className="cursor-pointer text-gray-800 text-center font-semibold italic hover:underline" onClick={handleGoToCareer}>
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
                                <span className="text-lg font-semibold text-pink-500 cursor-pointer underline" onClick={handleGoToCareer}> Konisagg Developing and consulting Tech</span>
                            </p>
                        </div>
                    </div>
                </>
            }

            <div className="bg-white  flex-1 p-10 w-full">
                <div className="max-w-[1300px] p-5 lg:p-10 mx-auto">
                    <div className="flex flex-col items-center justify-center mt-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">The Finest Selection OF Experts</h2>
                        <p className="text-lg md:text-xl text-center mb-12">
                            A therapeutic relationship is built on trust and confidence. At Now&Me, we provide you with the right expert who can help you feel safe and comfortable in your mental health journey.
                        </p>
                        <div className="flex flex-wrap justify-center gap-12">
                            <div className="flex flex-col items-center">
                                <div className="bg-orange-100 rounded-full p-6">
                                    <FaGoogleWallet className="w-12 h-12 text-orange-900" />
                                </div>
                                <p className="mt-4 text-base md:text-lg text-center">price starts at ₹30</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-orange-100 rounded-full p-6">
                                    <FaPeopleGroup className="w-12 h-12 text-orange-900" />
                                </div>
                                <p className="mt-4 text-base md:text-lg text-center">Verified Experts</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-orange-100 rounded-full p-6">
                                    <MdOutlineEventAvailable className="w-12 h-12 text-orange-900" />
                                </div>
                                <p className="mt-4 text-base md:text-lg text-center">Instant Availability</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="bg-orange-100 rounded-full p-6">
                                    <BsClockHistory className="w-12 h-12 text-orange-900" />
                                </div>
                                <p className="mt-4 text-base md:text-lg text-center">Available 24 X 7</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#f5f8fa]  flex-1 p-10 w-full">
                <div className="max-w-[1300px] lg:p-5 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-2">
                        <div className="flex flex-col justify-center items-start">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect with top therapists Of India with a single click</h2>
                            <p className="text-lg md:text-xl mb-12">
                                Access India's top Mental Health Experts at affordable prices. Talk about depression, anxiety, and much more openly and without any shame with our verified panel of therapists.
                            </p>
                            <button className='bg-black hover:bg-gray-800 text-white font-semibold px-8 py-2  rounded-md'
                                onClick={handleGoto("login")}>
                                <p>Start Chat</p>
                            </button>
                        </div>
                        <div className="flex justify-center items-center">
                            <img src="/banner-2.png" alt="Descriptive Alt Text" className="max-w-full h-auto" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white  flex-1 p-10 w-full">
                <div className="max-w-[1300px] lg:p-5 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-2">
                        <div className="flex justify-center items-center">
                            <img src="/banner-3.png" alt="Descriptive Alt Text" className="max-w-full h-auto" />
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unlock Your Inner Peace, Share Your Thoughts, Feel Free🧡</h2>
                            <p className="text-lg md:text-xl mb-12">
                                Come be a part of our safe, supportive & inclusive community. Share your thoughts and feelings, to get words of encouragement from fellow users.
                            </p>
                            <button className='bg-black hover:bg-gray-800 text-white font-semibold px-8 py-2  rounded-md'
                                onClick={handleGoto("login")}>
                                <p>Share thought</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white  flex-1 p-10 w-full">
                <div className="max-w-[1300px] lg:p-5 mx-auto flex items-center justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Frequently asked questions❓</h2>
                        <p className="text-base md:text-lg mb-12">
                            Browse through the most frequently asked questions
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mainbody

{/* <div className="bg-[#edeeef]  flex-1 p-10 w-full">
        <div className="max-w-[1300px] p-5 lg:p-10 mx-auto">

        </div>
    </div> */}