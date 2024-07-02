// export default Card;
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { PiCopySimple } from "react-icons/pi";
import { useState } from "react";

interface CardData {
    id: number;
    _id: string;
    title: string;
    content: string;
    url: string;
}

function Card({ id, cardInfo, isHovered, onMouseEnter, onMouseLeave, isSelected, onSelect }: {
    id: string;
    cardInfo: CardData;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    isSelected: boolean;
    onSelect: () => void;
}) {

    const [linkCopied, setLinkCopied] = useState(false)
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate(`/recruiter/career/details?id=${id}`);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(cardInfo.url);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
            console.log("linkCopied", linkCopied)
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    return (
        <div
            className={`rounded-md p-3 mb-4 flex gap-3 cursor-pointer border-t-[8px] items-center shadow-md 
            ${isHovered ? 'border-t-pink-500 hovered' : 'border-gray-200'} 
            ${isSelected ? 'border-x-[2px] border-b-[2px] border-pink-500' : ''} `}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="flex flex-col flex-grow w-5/6 gap-3">
                <div className="flex justify-between w-full">
                    <input type="checkbox" checked={isSelected} onChange={onSelect} />
                    <IoSettingsOutline />
                </div>
                <div>
                    <h3 className={`text-base text-gray-800 font-semibold  mb-1 `}>{cardInfo.title}</h3>
                    <p className={`text-gray-500 text-sm`}>{cardInfo.content}</p>
                </div>
                <div>
                    <a href={`/recruiter/interview/details?id=${id}`} className="text-gray-700 text-sm hover:underline" onClick={handleClick}>view schedule details</a>
                </div>
                <hr className="bg-gray-200 p-[0.02rem]" />
                <div>
                    <div onClick={handleCopyLink} className="flex items-center gap-1 text-blue-500">
                        <PiCopySimple className="text-lg" />
                        <a className="hover:underline text-sm" >copy link</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
