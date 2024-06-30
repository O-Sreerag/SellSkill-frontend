// export default Card;
import { useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
// import { PiCopySimple } from "react-icons/pi";
// import { useState } from "react";

interface CardData {
    id?: number;
    career: CareerData;
    status: string;
}

interface CareerData {
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

function Card({ id, cardInfo, isHovered, onMouseEnter, onMouseLeave, isSelected, onSelect }: {
    id: string;
    cardInfo: CardData;
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    isSelected: boolean;
    onSelect: () => void;
}) {
    const navigate = useNavigate();

    const handleClick = (navTo: string) =>(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if(navTo == "info") {
            navigate(`/applicant/career/details?id=${id}`);
        } else if(navTo = "apply") {
            navigate(`/applicant/career/apply?careerId=${id}`);
        }
    };

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
                    <h3 className={`text-base text-gray-800 font-semibold  mb-1 `}>{cardInfo.career.posting_title}</h3>
                    <p className={`text-gray-500 text-sm`}>{cardInfo.career.industry}</p>
                </div>
                <div className="flex justify-between">
                    <a href={`/recruiter/interview/details?id=${id}`} className="text-gray-700 text-sm hover:underline" onClick={handleClick("info")}>view info</a>
                    <a href={`/recruiter/interview/details?id=${id}`} className="text-green-500  text-sm font-semibold underline" onClick={handleClick("apply")}>apply</a>
                </div>
            </div>
        </div>
    );
}

export default Card;
