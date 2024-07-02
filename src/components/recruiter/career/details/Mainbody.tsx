import { useEffect, useState } from "react"
// import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Mainbody.css'
import { CiMenuKebab } from "react-icons/ci";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { RiUserReceivedFill, RiUserStarFill, RiUserUnfollowFill } from "react-icons/ri";

import Card from "./Card";
import { CustomNextArrow, CustomPrevArrow } from "./slider";
import Navbar2 from "../../Navbar2"
import { useLocation } from "react-router-dom";
import { api } from "../../../../services/axios";
import ApplicationCard from "./ApplicationCard";
import ApplicantCard from './applicantCard'
// import Sliders from "./Sliders";
import { useSelector } from "react-redux";
import { AppRootState } from "../../../../redux/store";

enum DropDownValues {
    Applications = "applications",
    Applicants = "applicants",
}

interface Career {
    _id: string;
    applicants: string[];
    benefits: string[];
    contact_name: string;
    date_opened: Date;
    industry: string;
    job_description: string[];
    job_type: string;
    location: string;
    no_of_positions: number;
    opening_status: string;
    posting_title: string;
    recruiterId: string;
    required_skills: string[];
    responsibilities: string[];
    salary_max: number;
    salary_min: number;
    target_date: Date;
    url: string;
    workExp_max: number;
    workExp_min: number;
}

interface CardData {
    id: number;
    _id: string;
    title: string;
    content: string[];
}

interface applicantsCardData {
    id?: number;
    _id?: string;
    name?: string;
    email: string;
    password: string;
    image?: string;
    phoneNo?: number;
    applications?: string;
    events?: string;
    verified?: boolean;
    status?: boolean;
    isGoogle: boolean;
    careers?: string[];
}

interface applicationsCardData {
    id?: number;
    _id: string;
    applicantId: string;
    careerId: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_no: string;
    dob: Date;
    gender: string;
    current_location: string;
    current_employer: string;
    current_ctc: number;
    experience: number;
    grad_year: Date;
    notice_period: number;
    expected_ctc: number;
    address: string;
    skill_set: string[];
    qualifications: string[];
    resume?: string;
}

const Mainbody = () => {
    // const navigate = useNavigate()
    const { search } = useLocation();
    const careerId = new URLSearchParams(search).get('id');

    const [cardsData, setCardsData] = useState<CardData[]>([]);
    const [hoveredCard, setHoveredCard] = useState(1);
    const [dropDownValue, setDropDownValue] = useState<DropDownValues>(DropDownValues.Applications);
    const [applicationsCardData, setApplicationsCardData] = useState<applicationsCardData[]>([])
    const [applicantsCardData, setApplicantsCardData] = useState<applicantsCardData[]>([])
    // const [showStatus, setShowStatus] = useState(false)
    const [currentCareerInfo, setCurrentCareerInfo] = useState<Career | null>(null)
    const { userProfile = { companyName: "", industry: "", headquarters: "", ceo: "", founded: "", employees: "", revenue: "" } } = useSelector((state: AppRootState) => state.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all careers for the current recruiter
                console.log("Fetch all careers for the current recruiter")
                const response = await api.get(`/career/getall`)
                console.log(response.data)
                const data: Career[] = response.data.result;
                setCardsData(data.map((item: { _id: string; posting_title: string; required_skills: string[]; }, index: number) => ({
                    id: index + 1,
                    _id: item._id,
                    title: item.posting_title,
                    content: [item.required_skills[0]]
                })));
                const currentCareerInfo = data.find(career => career._id === careerId) ?? null
                setCurrentCareerInfo(currentCareerInfo)

                console.log("Fetch applications for selected career")
                if (careerId) {
                    // Fetch applications for selected career
                    const applicationsResponse = await api.get(`/career/application/getall?careerId=${careerId}`);
                    const data2 = applicationsResponse.data.result;
                    console.log("data2 :", data2)
                    setApplicationsCardData(data2.map((item: applicationsCardData, index: number) => ({
                        id: index + 1,
                        ...item
                    })));
                    console.log("applications details")
                    console.log(applicationsCardData)

                    // Extract applicant IDs and Fetch applicant details using the applicant IDs
                    const applicantIds = data2.map((application: applicationsCardData) => application.applicantId);
                    if (applicantIds.length > 0) {
                        const applicantsResponse = await api.get(`/auth/applicant/getByIds?ids=${applicantIds.join(',')}`);
                        console.log(applicantsResponse.data.result)
                        setApplicantsCardData(applicantsResponse.data.result);
                    } else {
                        console.warn('No applicant IDs found');
                    }
                } else {
                    console.warn('No careerId found in the URL');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [careerId]);

    const handleDropDownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDropDownValue(event.target.value as DropDownValues);
    };

    const handleMouseEnter = (id: any) => {
        setHoveredCard(id);
    };
    const handleMouseLeave = () => {
        setHoveredCard(1);
    };

    let cardsSlideNumber
    console.log(cardsData.length)
    cardsData.length == 1 ? cardsSlideNumber = 1 : cardsSlideNumber = 3;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: cardsSlideNumber,
        centerMode: true,
        centerPadding: '5px',
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    // const [menuActive, setMenuActive] = useState('applicants')
    console.log(cardsData, "card data")

    // const cardsblah = [
    //     { id: 1, content: "First Card" },
    //     { id: 2, content: "Second Card" },
    //     { id: 3, content: "Third Card" },
    //     { id: 4, content: "Fourth Card" },
    //     { id: 5, content: "Fifth Card" },
    //     // Add more cards as needed
    // ];

    return (
        <div className="flex justify-center w-full bg-white">
            <div className='max-w-[1100px] lg:min-w-[1100px] border-x-2 border-gray-200  w-full'>
                <div className="items-center flex flex-col justify-between">

                    <div className="flex w-full bg-white gap-1 min-h-screen">

                        <div className="border-r-2 border-gray-200 w-1/2 justify-between"> {/* left side */}

                            <div className="w-full border-b-2 border-gray-200 bg-[#f5f8fa] h-[60px] items-center flex">
                                <div className="flex w-full justify-between px-4">
                                    <div>
                                        <select
                                            value={dropDownValue}
                                            onChange={handleDropDownChange}
                                            className="text-sm p-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring-0 focus:bg-gray-100 hover:bg-gray-100"
                                        >
                                            <option value={DropDownValues.Applications}>Applications</option>
                                            <option value={DropDownValues.Applicants}>Applicants</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type="search" className="rounded-lg border py-1 px-2 text-gray-400 focus:outline-none" placeholder="Search..." />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <div className={`px-4 space-y-2 overflow-y-scroll max-h-[620px] custom-scrollbar ${applicationsCardData && applicationsCardData.length > 7 ? 'mr-1' : ''}`}>
                                    {/* <div className="p-3 flex justify-between items-center text-sm hover:bg-[#f5f8fa] text-gray-700 border-gray-200 border-2 rounded-md shadow-sm">
                                        <div className="flex gap-2 items-center">
                                            <div>
                                                <div className="cursor-pointer"
                                                    onClick={() => { showStatus ? setShowStatus(false) : setShowStatus(true) }}>
                                                    <RiUserStarFill className="text-4xl text-green-500 bg-green-50 border border-green-500 rounded-full p-2" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold">Sreerag O</p>
                                                <p>sreerag@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="flex w-1/2 items-center justify-between">
                                            <p>Exp: 3Yrs, <span className="text-green-400 font-semibold"> 97% </span>qualified</p>
                                            <button className="rounded-md border px-2 py-[0.15rem] shadow-md hover:bg-[#b0d5eb] hover:text-white text-blue-500"><p>connect</p></button>
                                        </div>
                                    </div>
                                    <div className="p-3 flex justify-between items-center text-sm hover:bg-[#f5f8fa] text-gray-700 border-gray-200 border-2 rounded-md shadow-sm">
                                        <div className="flex gap-2 items-center">
                                            <div>
                                                <RiUserReceivedFill className="text-4xl text-blue-500 bg-blue-50 border border-blue-500 rounded-full p-2" />
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold">Sreerag O</p>
                                                <p>sreerag@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="flex w-1/2 items-center justify-between">
                                            <p>Exp: 3Yrs, <span className="text-green-400 font-semibold"> 97% </span>qualified</p>
                                            <button className="rounded-md border px-2 py-[0.15rem] shadow-sm"><p className="text-blue-500">connect</p></button>
                                        </div>
                                    </div>
                                    <div className="p-3 flex justify-between items-center text-sm hover:bg-[#f5f8fa] text-gray-700 border-gray-200 border-2 rounded-md shadow-sm">
                                        <div className="flex gap-2 items-center">
                                            <div>
                                                <RiUserUnfollowFill className="text-4xl text-red-500 bg-red-50 border border-red-500 rounded-full p-2" />
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold">Sreerag O</p>
                                                <p>sreerag@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="flex w-1/2 items-center justify-between">
                                            <p>Exp: 3Yrs, <span className="text-green-400 font-semibold"> 97% </span>qualified</p>
                                            <button className="rounded-md border px-2 py-[0.15rem] shadow-sm"><p className="text-blue-500">connect</p></button>
                                        </div>
                                    </div> */}
                                    {
                                        dropDownValue == DropDownValues.Applicants ?
                                            (
                                                applicantsCardData && applicantsCardData.length >= 1 ? (
                                                    <>
                                                        {applicantsCardData.map((applicant) => (
                                                            <ApplicantCard key={applicant._id} applicantData={applicant} connectedStatus="unread" />
                                                        ))}
                                                    </>
                                                ) : (
                                                    <div className="w-full pt-20">
                                                        <div className="flex flex-col justify-center items-center">
                                                            <img src="/public/404-1.png" alt="404" />
                                                            <h3 className="text-lg font-semibold text-blue-gray-600">Whoops!!</h3>
                                                            <p className="text-sm text-blue-gray-600">No Applicants has yet been recieved</p>
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                applicationsCardData && applicationsCardData.length >= 1 ? (
                                                    <>
                                                        {applicationsCardData.map((application) => (
                                                            <ApplicationCard key={application._id} applicationData={application} connectedStatus="unread" />
                                                        ))}
                                                    </>
                                                ) : (
                                                    <div className="w-full pt-20">
                                                        <div className="flex flex-col justify-center items-center">
                                                            <img src="/public/404-1.png" alt="404" />
                                                            <h3 className="text-lg font-semibold text-blue-gray-600">Whoops!!</h3>
                                                            <p className="text-sm text-blue-gray-600">No Applications has yet been recieved</p>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className=" border-l-2 border-gray-200  w-1/2"> {/* left side */}
                            <div className="w-full flex justify-between border-b-2 border-gray-200 h-[60px]">
                                <div className="items-center flex px-2 cursor-pointer">
                                    <CiMenuKebab />
                                </div>
                                <div className="p-3">
                                    <Navbar2 />
                                </div>
                            </div>

                            <div className="py-4 mx-1">
                                <div className={`overflow-y-scroll max-h-[450px] custom-scrollbar bg-white transition-all duration-1000 w-full`}>
                                    {
                                        currentCareerInfo &&
                                        <>
                                            <div className="border-white border-[4px] rounded-lg p-6">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-black">{currentCareerInfo.posting_title}</h3>
                                                    <h3 className="text-lg font-semibold text-pink-500 cursor-pointer hover:underline">Konisagg Developing and consulting Tech</h3>
                                                    <div className="flex">
                                                        <div className="mt-4 text-black grid grid-cols-3 gap-2 w-[95%]">
                                                            <p className="text-sm">Experience: {currentCareerInfo.workExp_min} - {currentCareerInfo.workExp_min} yrs</p>
                                                            <p className="text-sm">Package: {currentCareerInfo.salary_min} - {currentCareerInfo.salary_max} LPA</p>
                                                            <p className="text-sm">Vacancies: {currentCareerInfo.no_of_positions} prs</p>
                                                            <p className="text-sm">Job type: {currentCareerInfo.job_type}</p>
                                                            <p className="text-sm">Work from home available</p>
                                                            <p className="text-sm">Status: <span className="text-black font-semibold">Open</span></p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`p-6`}>
                                                <div>
                                                    <div className="mt-4 gap-2 w-[95%]">
                                                        <div>
                                                            <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                                                            <ul className="p-5 list-disc text-gray-800 text-sm">
                                                                {
                                                                    currentCareerInfo.job_description.map(eachItem => (
                                                                        <li className="mb-2">{eachItem}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                                                            <ul className="p-5 list-disc text-gray-800 text-sm">
                                                                {
                                                                    currentCareerInfo.benefits.map(eachItem => (
                                                                        <li className="mb-2">{eachItem}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                                                            <ul className="p-5 list-disc text-gray-800 text-sm">
                                                                {
                                                                    currentCareerInfo.responsibilities.map(eachItem => (
                                                                        <li className="mb-2">{eachItem}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-semibold mb-3">Skills Required</h3>
                                                            <ul className="text-gray-800 text-sm">
                                                                {
                                                                    currentCareerInfo.required_skills.map(eachItem => (
                                                                        <li className="mb-2">{eachItem}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                            <div className="mt-8">
                                                                <h3 className="text-lg font-semibold mb-3">Company Information</h3>
                                                                <div className="mt-2 grid-cols-2 grid">
                                                                    <p className="text-gray-800 text-sm mb-2">Company:<span className="font-semibold">{userProfile?.companyName}</span></p>
                                                                    <p className="text-gray-800 text-sm mb-2">Industry:<span className="font-semibold">{userProfile?.industry}</span></p>
                                                                    <p className="text-gray-800 text-sm mb-2">Headquarters:<span className="font-semibold">{userProfile?.headquarters}</span></p>
                                                                    <p className="text-gray-800 text-sm mb-2">Ceo:<span className="font-semibold">{userProfile?.ceo}</span></p>
                                                                    <p className="text-gray-800 text-sm mb-2">Founded:<span className="font-semibold">{userProfile?.founded}</span></p>
                                                                    <p className="text-gray-800 text-sm mb-2">Employees:<span className="font-semibold">{userProfile?.employees}</span></p>
                                                                    <p className="text-gray-800 text-sm mb-2">Revenue:<span className="font-semibold">{userProfile?.revenue}</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {/* <div className="border-white border-[4px] rounded-lg p-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-black">MERN Stack developer (jnr)</h3>
                                            <h3 className="text-lg font-semibold text-pink-500 cursor-pointer hover:underline">Konisagg Developing and consulting Tech</h3>
                                            <div className="flex">
                                                <div className="mt-4 text-black grid grid-cols-3 gap-2 w-[95%]">
                                                    <p className="text-sm">Experience: 1 - 3 yrs</p>
                                                    <p className="text-sm">Package: 7 - 8 LPA</p>
                                                    <p className="text-sm">Vacancies: 4 prs</p>
                                                    <p className="text-sm">Job type: Full time</p>
                                                    <p className="text-sm">Work from home available</p>
                                                    <p className="text-sm">Status: <span className="text-black font-semibold">Open</span></p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className={`p-6`}>
                                        <div>
                                            <div className="mt-4 gap-2 w-[95%]">
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
                                    </div> */}
                                </div>
                            </div>

                            <div className="p-2">
                                <div>

                                </div>
                                <div className="p-2 relative style={{ position: 'fixed', bottom: 0 }}">
                                    {cardsData.length === 0 ? (
                                        <div className="flex justify-center items-center"><p className="text-red-500">No career have been added</p></div>
                                    ) : (
                                        <Slider {...settings}>
                                            {cardsData.map((card) => (
                                                <div
                                                    key={card.id}
                                                    className={`px-1 `}
                                                    style={{ zIndex: 10 - Math.abs(hoveredCard - card.id) }}
                                                >
                                                    <Card
                                                        id={card._id}
                                                        key={card.id}
                                                        title={card.title}
                                                        content={card.content}
                                                        isHovered={hoveredCard === card.id}
                                                        onMouseEnter={() => handleMouseEnter(card.id)}
                                                        onMouseLeave={handleMouseLeave}
                                                    />
                                                </div>
                                            ))}
                                        </Slider>
                                    )}
                                    {/* <div className="bg-gray-200 min-h-screen flex justify-center items-center">
                                        <Sliders cards={cardsblah} />
                                    </div> */}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Mainbody
