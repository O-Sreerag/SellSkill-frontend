// import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function Card({ id, title, content, isHovered, onMouseEnter, onMouseLeave }: {
    id: string;
    title: string;
    content: string[];
    isHovered: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recruiter/career/details?id=${id}`);
    };

    return (
        <div
            className={`rounded-md my-3 p-3 flex gap-3 cursor-pointer border-t-[7px] items-center shadow-md ${isHovered ? 'border-t-pink-500 hovered' : 'border-gray-200'}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={handleClick}
        >
            <div className="flex flex-col flex-grow w-5/6">
                <h3 className={`text-xs font-semibold mb-1 `}>{title}</h3>
                <p className={`text-gray-600 text-[0.6rem] flex-grow max-h-[40px] overflow-hidden `}>{content[0]}</p>
            </div>
        </div>
    );
}

export default Card;