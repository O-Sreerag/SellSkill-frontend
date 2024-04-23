import { RxAvatar } from "react-icons/rx";

function Card({ title, content, isHovered, onMouseEnter, onMouseLeave }: any) {
    return (
        <div
            className={`rounded-lg p-3 mb-4 flex gap-3 items-center shadow-md ${isHovered ? 'text-white bg-[#576475]' : 'bg-gray-100'}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="w-1/6">
                <RxAvatar className={`w-full h-full text-black rounded-full ${isHovered ? 'text-white' : ''}`} />
            </div>
            <div className="flex flex-col flex-grow w-5/6">
                <h3 className={`text-lg font-semibold mb-1 ${isHovered ? 'text-white' : ''}`}>{title}</h3>
                <p className={`text-gray-600 text-sm flex-grow max-h-[40px] overflow-hidden ${isHovered ? 'text-white' : ''}`}>{content}</p>
            </div>
        </div>
    );
}

export default Card;
