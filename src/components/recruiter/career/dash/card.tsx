import { RxAvatar } from "react-icons/rx";

function Card({ title, content, isHovered, onMouseEnter, onMouseLeave }: any) {
    return (
        <div
            className={`rounded-md p-3 mb-4 flex gap-3 cursor-pointer border-t-[7px] items-center shadow-md ${isHovered ? 'border-t-pink-500 hovered' : 'border-gray-200'}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="w-1/6">
                <RxAvatar className={`w-full h-full text-black rounded-full `} />
            </div>
            <div className="flex flex-col flex-grow w-5/6">
                <h3 className={`text-lg font-semibold mb-1 `}>{title}</h3>
                <p className={`text-gray-600 text-sm flex-grow max-h-[40px] overflow-hidden `}>{content}</p>
            </div>
        </div>
    );
}

export default Card;
