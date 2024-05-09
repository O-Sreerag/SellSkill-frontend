import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-10">
            <button
                className="text-pink-500 bg-pink-50 rounded-full p-2 focus:outline-none"
                onClick={onClick}
            >
                <FaChevronLeft />
            </button>
        </div>
    );
};

const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-10">
            <button
                className="text-pink-500 bg-pink-50 rounded-full p-2 focus:outline-none"
                onClick={onClick}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export { CustomPrevArrow, CustomNextArrow };
