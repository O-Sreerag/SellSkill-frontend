import { useEffect, useState } from "react"
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Mainbody.css'
import { CiMenuKebab } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiUserReceivedFill, RiUserStarFill, RiUserUnfollowFill } from "react-icons/ri";

import Card from "./Card";
import { CustomNextArrow, CustomPrevArrow } from "./slider";
import Navbar2 from "../../Navbar2"
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../../services/axios";
import ApplicantCard from "./ApplicantCard";

interface CardData {
    id: number;
    _id: string;
    title: string;
    content: string;
}
interface applicantsCardData {
    id: number;
    _id: string;
    name: string;
    email: string;
    exp: number;
}

const Mainbody = () => {
    const navigate = useNavigate()
    const { search } = useLocation();
    const careerId = new URLSearchParams(search).get('id');

    const [cardsData, setCardsData] = useState<CardData[]>([]);
    const [hoveredCard, setHoveredCard] = useState(1);
    const [applicantsCardData, setApplicantsCardData] = useState<applicantsCardData[]>([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all careers for the current recruiter
                const response = await api.get(`/career/getall`)
                console.log(response.data)
                const data = response.data.result;
                console.log(data)
                setCardsData(data.map((item: { _id: string; posting_title: string; required_skills: any; }, index: number) => ({
                    id: index + 1,
                    _id: item._id,
                    title: item.posting_title,
                    content: item.required_skills
                })));
                console.log(cardsData)

                // Fetch applicants for each career

                const applicantsResponse = await api.get(`/career/getApplicants/${careerId}`);
                const data2 = applicantsResponse.data.result
                console.log(data2)
                setApplicantsCardData(data2.map((item: { _id: string; name: string; email: string; exp: number }, index: number) => ({
                    id: index + 1,
                    _id: item._id,
                    name: item.name,
                    email: item.email,
                    exp: item.exp,
                })));
                console.log(applicantsCardData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



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
        slidesToShow: cardsSlideNumber,
        slidesToScroll: 3,
        centerMode: true,
        centerPadding: '5px',
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    const [menuActive, setMenuActive] = useState('applicants')
    console.log(cardsData, "card data")
    return (
        <div className="flex justify-center w-full bg-white">
            <div className='max-w-[1100px] lg:min-w-[1100px] border-x-2 border-gray-200  w-full'>
                <div className="items-center flex flex-col justify-between">

                    <div className="flex w-full bg-white gap-1 min-h-screen">

                        <div className="border-r-2 border-gray-200 w-1/2 justify-between"> {/* left side */}

                            <div className="w-full border-b-2 border-gray-200 bg-[#f5f8fa] h-[60px] items-center flex">
                                <div className="flex w-full justify-between px-4">
                                    <div className={`w-full text-gray-700 flex gap-1 items-center`}>
                                        <h3 >Applicants</h3>
                                        <IoMdArrowDropdown className="cursor-pointer" />
                                    </div>
                                    <div>
                                        <input type="search" className="rounded-lg border py-1 px-2 text-gray-400 focus:outline-none" placeholder="Search..." />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5">
                                <div className="px-4 space-y-2">
                                    <div className="p-4 flex justify-between items-end text-sm hover:bg-[#f5f8fa] text-gray-700 border-gray-200 border-2 rounded-md shadow-sm">
                                        <div className="flex gap-2 items-center">
                                            <div>
                                                <RiUserStarFill className="text-4xl text-green-500 bg-green-50 border border-green-500 rounded-full p-2" />
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold">Sreerag O</p>
                                                <p>sreerag@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="space-x-2">
                                            Exp: 3Yrs, <span className="text-green-400 font-semibold"> 97% </span>qualified
                                            <button className="rounded-md border px-3 py-1">connect</button>
                                        </div>
                                    </div>
                                    <div className="p-4 flex justify-between items-end text-sm hover:bg-[#f5f8fa] text-gray-700 border-gray-200 border-2 rounded-md shadow-sm">
                                        <div className="flex gap-2 items-center">
                                            <div>
                                                <RiUserReceivedFill className="text-4xl text-blue-500 bg-blue-50 border border-blue-500 rounded-full p-2" />
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold">Sreerag O</p>
                                                <p>sreerag@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="space-x-2">
                                            Exp: 3Yrs, <span className="text-green-400 font-semibold"> 97% </span>qualified
                                            <button className="rounded-md border px-3 py-1">connect</button>
                                        </div>
                                    </div>
                                    <div className="p-4 flex justify-between items-end text-sm hover:bg-[#f5f8fa] text-gray-700 border-gray-200 border-2 rounded-md shadow-sm">
                                        <div className="flex gap-2 items-center">
                                            <div>
                                                <RiUserReceivedFill className="text-4xl text-blue-500 bg-blue-50 border border-blue-500 rounded-full p-2" />
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold">Sreerag O</p>
                                                <p>sreerag@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="space-x-2">
                                            Exp: 3Yrs, <span className="text-green-400 font-semibold"> 97% </span>qualified
                                            <button className="rounded-md border px-3 py-1">connect</button>
                                        </div>
                                    </div>
                                    <div className="p-4 flex justify-between items-end text-sm hover:bg-[#f5f8fa] text-gray-700 border-gray-200 border-2 rounded-md shadow-sm">
                                        <div className="flex gap-2 items-center">
                                            <div>
                                                <RiUserUnfollowFill className="text-4xl text-red-500 bg-red-50 border border-red-500 rounded-full p-2" />
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold">Sreerag O</p>
                                                <p>sreerag@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="space-x-2">
                                            Exp: 3Yrs, <span className="text-red-400 font-semibold"> 37% </span>qualified
                                            <button className="rounded-md border px-3 py-1">connect</button>
                                        </div>
                                    </div>
                                    <div className="p-4 flex justify-between items-end text-sm hover:bg-[#f5f8fa] text-gray-700 border-gray-200 border-2 rounded-md shadow-sm">
                                        <div className="flex gap-2 items-center">
                                            <div>
                                                <RiUserStarFill className="text-4xl text-green-500 bg-green-50 border border-green-500 rounded-full p-2" />
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold">Sreerag O</p>
                                                <p>sreerag@gmail.com</p>
                                            </div>
                                        </div>
                                        <div className="space-x-2">
                                            Exp: 3Yrs, <span className="text-green-400 font-semibold"> 97% </span>qualified
                                            <button className="rounded-md border px-3 py-1">connect</button>
                                        </div>
                                    </div>
                                    {
                                        applicantsCardData && (
                                            <>
                                                {applicantsCardData.map((applicant) => (
                                                    <ApplicantCard key={applicant._id} applicantData={applicant} connectedStatus="unread" />
                                                ))}
                                            </>
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
                                <div className={`overflow-y-scroll max-h-[485px] custom-scrollbar bg-white transition-all duration-1000 w-full`}>
                                    <div className="border-white border-[4px] rounded-lg p-6">
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
                                    </div>
                                </div>
                            </div>

                            <div className="p-2">
                                <div>

                                </div>
                                <div className="p-2 relative style={{ position: 'fixed', bottom: 0 }}">
                                    {cardsData.length === 0 ? (
                                        <div className="mt-28 text-red-500">No career have been added</div>
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