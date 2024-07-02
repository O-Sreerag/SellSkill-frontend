import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { PiCopySimple } from "react-icons/pi";
import { useState } from "react";
import { api } from "../../../../services/axios";

interface InterviewData {
    id?: number;
    _id?: string;
    recruiterId?: string;
    host?: string;
    team?: string[];
    candidate_id?: string;
    candidate_email?: string;
    candidates_emails?: string[];
    eventType?: string;
    eventName?: string;
    date?: Date;
    time?: string;
    duration?: string;
    comformedEmails?: string[];
    conformStatusOnApplicant?: string;
    conformStatusOnRecruiter?: string;
}

function Card({ interview, isHovered, onMouseEnter, onMouseLeave, isSelected, onSelect }: {
    interview: InterviewData;
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
        navigate(`/recruiter/interview/details?id=${interview._id}`);
    };

    const handleCopyLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setLinkCopied(true)
        console.log("linkCopied", linkCopied)
    }
    
    const handleConform = async(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        console.log("handle conform for interview")
        try {
            const response = await api.put(`/interview/update/${interview._id}`, {conformStatusOnRecruiter: "accepted"})
            console.log(response.data)
        } catch (error) {
            console.error('Error conforming for interview:', error);
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
                    <h3 className={`text-base text-gray-800 font-semibold  mb-1 `}>{interview.eventName}</h3>
                    <p className={`text-gray-500 text-sm`}>{interview.eventType}</p>
                </div>
                <div className="flex justify-between">
                    <a href={`/recruiter/interview/details?id=${interview._id}`} className="text-gray-700 text-sm hover:underline" onClick={handleClick}>view schedule details</a>
                    <a href={`/recruiter/interview/details?id=${interview._id}`} className="bg-green-100 rounded-md px-1 text-green-500 text-sm hover:underline" onClick={handleConform}>conform</a>
                </div>
                <hr className="bg-gray-200 p-[0.02rem]" />
                <div>
                    <div className="flex items-center gap-1 text-blue-500">
                        <PiCopySimple className="text-lg" />
                        <a className="hover:underline text-sm" onClick={handleCopyLink} >copy link</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;