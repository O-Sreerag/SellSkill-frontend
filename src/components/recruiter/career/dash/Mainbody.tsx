import { useState, useEffect } from "react";
import axios from 'axios';
import { FaPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './Mainbody.css'
import Card from './card';
import { AppRootState } from '../../../../redux/store';
import Navbar2 from '../../Navbar2';
import { api } from "../../../../services/axios";

interface CardData {
    id: number;
    _id: string;
    title: string;
    content: string;
}

const Mainbody = () => {
    const navigate = useNavigate()

    useEffect(() => {
        console.log("userEmail : ", userEmail, " userName :", userName)
        const fetchData = async () => {
            try {
                const response = await api.get(`/career/getall`)
                console.log(response.data)
                const data = response.data.result;
                setCardsData(data.map((item: { _id: string; posting_title: string; required_skills: any; }, index: number) => ({
                    id: index + 1,
                    _id: item._id,
                    title: item.posting_title,
                    content: item.required_skills
                })));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [cardsData, setCardsData] = useState<CardData[]>([]);
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (id: any) => {
        setHoveredCard(id);
    };
    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    const { userName = 'name', userEmail = 'email' } = useSelector((state: AppRootState) => state.user)

    const { pathname } = useLocation();
    const handleCreate = () => {
        const destination = '/recruiter/career/create';

        if (pathname !== destination) {
            navigate(destination);
        }
    }
    
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

                    {cardsData.length === 0 ? ( // Check if cardsData is empty
                        <div className="mt-28 text-red-500">No career have been added</div>
                    ) : (
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 custom-scrollbar px-3 w-full"> {/* container 2 */}
                            {cardsData.map((card) => (
                                <Card
                                    id={card._id}
                                    key={card.id}
                                    title={card.title}
                                    content={card.content}
                                    isHovered={hoveredCard === card.id}
                                    onMouseEnter={() => handleMouseEnter(card.id)}
                                    onMouseLeave={handleMouseLeave}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Mainbody

// Example data for dynamic cards
// const cardsData = [
//     { id: 6, title: "Card Title 6", content: "Card Card content goes here...Card content goes here..." },
//     { id: 7, title: "Card Title 7", content: "Card Card content goes here...Card content goes here..." },
//     { id: 8, title: "Card Title 8", content: "Card Card content goes here...Card content goes here..." },
//     // Add more card data as needed
// ];