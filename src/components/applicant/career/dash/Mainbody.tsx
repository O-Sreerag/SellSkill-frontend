import { useEffect, useState } from 'react'
import Navbar2 from '../../Navbar2'
// import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../../../../services/axios'

import { RxCross1 } from 'react-icons/rx'
// import { RxCross2 } from 'react-icons/rx'
// import { IoIosArrowDropdown, IoMdArrowDropdown } from 'react-icons/io'
// import { RiUserStarFill, RiUserUnfollowFill, RiUserReceivedFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { AppRootState } from '../../../../redux/store'
import Card from './card'
import { MdStars } from 'react-icons/md'

enum DropDownValues {
    All = "all",
    Applied = "applied",
    Starred = "starred"
}

interface CardData {
    id?: number;
    career: CareerData;
    status: string;
}

interface CareerData {
    _id: string;
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
    const [dropDownValue, setDropDownValue] = useState<DropDownValues>(DropDownValues.All);
    const { userName = 'name', userEmail = 'email' } = useSelector((state: AppRootState) => state.user);
    const [cardsData, setCardsData] = useState<CardData[]>([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [selectedCards, setSelectedCards] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("getting all careers")
                const response = await api.get(`/career/getall`)
                console.log(response.data)

                if (response.status == 200) {
                    console.log(response.data.result)
                    console.log("recruiters details")
                    const data = response.data.result;
                    // console.log(response.data.result[0]?.career?._doc)
                    setCardsData(data.map((item: any, index: number) => ({
                        id: index + 1,
                        career: item?.career?._doc,
                        status: item?.status
                    })));
                }

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
        setHoveredCard(null);
    };

    const handleSelectCard = (id: string) => {
        console.log("handleSelectCard", id)
        setSelectedCards(prevSelectedCards =>
            prevSelectedCards.includes(id)
                ? prevSelectedCards.filter(cardId => cardId !== id)
                : [...prevSelectedCards, id]
        );
    };

    // const [showStatus, setShowStatus] = useState(false)
    const handleDropDownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDropDownValue(event.target.value as DropDownValues);
    };

    return (
        <div className="flex justify-center w-full bg-white">
            <div className='max-w-[1100px] lg:min-w-[1100px]'>
                <div className="items-center flex flex-col justify-between p-5">
                    <Navbar2 />
                    <div className="w-full space-y-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#2B2B2E] justify-start barlow-regular">Career Management</h2>
                        <p className="text-gray-600">View / Manage careers copied from urls.</p>
                    </div>

                    <div className="flex justify-between w-full mt-16 border-b-2 pb-1">
                        <div className='flex gap-3'>
                            <div className='items-center flex'>
                                <div className='hover:ring-2 hover:ring-gray-300 rounded-full px-[13px] py-[8px] cursor-pointer text-sm bg-gray-400 text-white'>{userName.charAt(0).toUpperCase()}</div>
                            </div>
                            <div>
                                <p className="text-gray-600">{userName}</p>
                                <p className="text-blue-700 italic">{userEmail}</p>
                            </div>
                        </div>
                        <div className="flex w-full justify-end gap-2 items-center p-2">
                            <div>
                                <select
                                    value={dropDownValue}
                                    onChange={handleDropDownChange}
                                    className="text-sm p-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring-0 focus:bg-gray-100 hover:bg-gray-100"
                                >
                                    <option value={DropDownValues.All}>All</option>
                                    <option value={DropDownValues.Applied}>Applied</option>
                                    <option value={DropDownValues.Starred}>Starred</option>
                                </select>
                            </div>
                            <div>
                                <input type="search" className="rounded-lg border py-1 px-2 text-gray-400 focus:outline-none" placeholder="Search..." />
                            </div>
                        </div>
                    </div>

                    <div className={`py-4 space-y-2 w-full`}>
                        {
                            selectedCards && selectedCards.length >= 1 &&
                            <div className="flex w-full pt-2 pl-3 justify-start gap-2 items-center">
                                <div>
                                    <RxCross1 className="text-lg text-pink-500 cursor-pointer" />
                                </div>
                                <p className="text-md text-gray-600 border-r-2 border-gray-400 pr-2">{selectedCards.length} selected</p>
                                <div className="border border-pink-500 p-1 rounded-md">
                                    <MdStars className="text-pink-500 text-md cursor-pointer" />
                                </div>
                            </div>
                        }

                        {cardsData.length === 0 ? (
                            <div className="p-10">
                                <div className="w-full pt-20">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src="/public/404-1.png" alt="404" />
                                        <h3 className="text-lg font-semibold text-blue-gray-600">Whoops!!</h3>
                                        <p className="text-sm text-blue-gray-600">No Careers(url) have been copied</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 custom-scrollbar px-3 w-full">
                                {cardsData.map((card) => (
                                    <Card
                                        id={card.career._id}
                                        key={card.id}
                                        cardInfo={card}
                                        isHovered={hoveredCard === card.id}
                                        onMouseEnter={() => handleMouseEnter(card.id)}
                                        onMouseLeave={handleMouseLeave}
                                        isSelected={selectedCards.includes(card.career._id)}
                                        onSelect={() => handleSelectCard(card.career._id)}
                                    />
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mainbody