import { useState, useEffect } from "react";
// import axios from 'axios';
import { FaPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

import './Mainbody.css'
import Card from './card';
import { AppRootState } from '../../../../redux/store';
import Navbar2 from '../../Navbar2';
import { api } from "../../../../services/axios";
import { RxCross1 } from "react-icons/rx";
import { IoTrashOutline } from "react-icons/io5";
import Alert from "../../../common/alert";

interface CardData {
    id: number;
    _id: string;
    title: string;
    content: string;
    url: string;
}

const Mainbody = () => {
    const navigate = useNavigate()
    const [cardsData, setCardsData] = useState<CardData[]>([]);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        console.log("userEmail : ", userEmail, " userName :", userName)
        const fetchData = async () => {
            try {
                const response = await api.get(`/career/getall`)
                console.log(response.data)
                const data = response.data.result;
                setCardsData(data.map((item: { _id: string; posting_title: string; required_skills: any; url: string }, index: number) => ({
                    id: index + 1,
                    _id: item._id,
                    title: item.posting_title,
                    content: [item.required_skills[0], item.required_skills[1]],
                    url: item.url,
                })));

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

    const { userName = 'Name', userEmail = 'email',  userProfile = { companyName: "", industry: "", headquarters: "", ceo: "", founded: "", employees: "", revenue: "" } } = useSelector((state: AppRootState) => state.user);

    const handleCreate = () => {
        if (Object.values(userProfile).some(value => !value)) {
            setShowAlert(true);
        } else {
            const destination = '/recruiter/career/create';
            navigate(destination);
        }
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleConfirmAlert = () => {
        setShowAlert(false);
        navigate('/recruiter/profile');
    };

    return (
        <div className="flex justify-center w-full bg-white">
            <div className='max-w-[1100px] lg:min-w-[1100px] min-h-[500px]'>
                <div className="items-center flex flex-col justify-between p-5">
                    <Navbar2 />

                    <div className="w-full space-y-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#2B2B2E] justify-start barlow-regular">Career Management</h2>
                        <p className="text-gray-600">Create and Manage Career openings in your company.</p>
                    </div>

                    <div className="flex justify-between w-full mt-16 border-b-2 pb-1">
                        <div className='flex gap-3'>
                            <div className='items-center flex'>
                                <div className='hover:ring-2 hover:ring-gray-300 rounded-full px-[13px] py-[8px] cursor-pointer text-sm bg-gray-400 text-white'>{userName.charAt(0).toUpperCase()}</div>
                            </div>
                            <div>
                                <p className="text-gray-600">{userName}</p>
                                <p className="text-blue-700 italic">https://sellskil.com/sreerag-fldjsfoi/connect</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <button className="rounded-lg bg-pink-50 text-pink-500 border border-pink-500 py-1 px-7 flex items-center gap-1" onClick={handleCreate}>
                                <FaPlus />
                                <p className="font-semibold text-base">create</p>
                            </button>
                        </div>
                    </div>

                    {
                        selectedCards && selectedCards.length >= 1 &&
                        <div className="flex w-full pt-2 pl-3 justify-start gap-2 items-center">
                            <div>
                                <RxCross1 className="text-lg text-pink-500 cursor-pointer" />
                            </div>
                            <p className="text-md text-gray-600 border-r-2 border-gray-400 pr-2">{selectedCards.length} selected</p>
                            <div className="border border-pink-500 p-1 rounded-md">
                                <IoTrashOutline className="text-pink-500 text-md cursor-pointer" />
                            </div>
                        </div>
                    }

                    {cardsData.length === 0 ? (
                        <div className="p-10">
                            <div className="w-full pt-20">
                                <img src="/404-1.png" alt="404" />
                                <div className="flex flex-col justify-center items-center">
                                    <h3 className="text-lg font-semibold text-blue-gray-600">Whoops!!</h3>
                                    <p className="text-sm text-blue-gray-600">No Careers have been added</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 custom-scrollbar px-3 w-full">
                            {cardsData.map((card) => (
                                <Card
                                    id={card._id}
                                    key={card.id}
                                    cardInfo={card}
                                    isHovered={hoveredCard === card.id}
                                    onMouseEnter={() => handleMouseEnter(card.id)}
                                    onMouseLeave={handleMouseLeave}
                                    isSelected={selectedCards.includes(card._id)}
                                    onSelect={() => handleSelectCard(card._id)}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>
            {showAlert && (
                <Alert
                    page="career"
                    onClose={handleCloseAlert}
                    onConfirm={handleConfirmAlert}
                />
            )}
        </div>
    )
}

export default Mainbody