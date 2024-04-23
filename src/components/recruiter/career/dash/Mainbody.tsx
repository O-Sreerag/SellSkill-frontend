import './Mainbody.css'
import { useState, useEffect } from "react";
import Card from './card';
import axios from 'axios';

const Mainbody = () => {

    
    interface CardData {
        id: number;
        title: string;
        content: string;
    }

    // Example data for dynamic cards
    // const cardsData = [
    //     { id: 1, title: "Card Title 1", content: "Card Card Card content goes here...Card content goes here...Card Card content goes here...Card content goes here..." },
    //     { id: 2, title: "Card Title 2", content: "Card Card Card content goes here...Card content goes here...Card Card content goes here...Card content goes here..." },
    //     { id: 3, title: "Card Title 3", content: "Card Card content goes here...Card content goes here..." },
    //     { id: 4, title: "Card Title 4", content: "Card Card content goes here...Card content goes here..." },
    //     { id: 5, title: "Card Title 5", content: "Card Card content goes here...Card content goes here..." },
    //     { id: 6, title: "Card Title 6", content: "Card Card content goes here...Card content goes here..." },
    //     { id: 7, title: "Card Title 7", content: "Card Card content goes here...Card content goes here..." },
    //     { id: 8, title: "Card Title 8", content: "Card Card content goes here...Card content goes here..." },
    //     // Add more card data as needed
    // ];
    const [cardsData, setCardsData] = useState<CardData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recruiter: string | null = localStorage.getItem("token") || null;
                const response = await axios.get(`http://sellskill.online/career/getall?recruiter=${recruiter}`)
                console.log(response.data)
                const data = response.data.result;
                setCardsData(data.map((item: { posting_title: any; required_skills: any; }, index: number) => ({
                    id: index + 1,
                    title: item.posting_title,
                    content: item.required_skills
                })));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (id: any) => {
        setHoveredCard(id);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

  return (
    <div className="flex-1 py-10 bg-[#fff] w-full px-10 md:px-20 lg:px-40">
        <div className='max-w-[1000px] min-h-[500px] border border-2 rounded-md'>
            <div className="items-center flex flex-col justify-between p-10 mx-auto"> {/* container 1 */}

                <div className="w-full px-3">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl barlow-light text-[#151B26] justify-start">Career Management</h2>
                </div>
                <div className="flex w-full mt-2 px-3">
                    <div className="w-3/4">
                        <p className="text-gray-600">Create and Manage Career openings in your company.</p>
                    </div>
                    <div className="w-1/4 flex justify-end">
                        <button className="bg-[#576475] text-white hover:bg-[#495565] hover:text-white font-sans py-1 px-8 rounded shadow-md">
                            Time to Hire
                        </button>
                    </div>
                </div>

                {cardsData.length === 0 ? ( // Check if cardsData is empty
                    <div className="mt-28 text-red-500">No career have been added</div>
                ) : (
                    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 custom-scrollbar px-3 w-full"> {/* container 2 */}
                        {cardsData.map((card) => (
                            <Card
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