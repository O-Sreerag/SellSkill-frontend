import React, { useRef } from 'react';
import 'tailwindcss/tailwind.css';

interface SliderProps {
    cards: { id: number; content: string }[];
}

const Sliders: React.FC<SliderProps> = ({ cards }) => {
    const sliderRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -220, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 220, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative">
            <button
                className="slider-btn left absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex justify-center items-center cursor-pointer z-10 left-5"
                onClick={scrollLeft}
            >
                &lt;
            </button>
            <button
                className="slider-btn right absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex justify-center items-center cursor-pointer z-10 right-5"
                onClick={scrollRight}
            >
                &gt;
            </button>
            <div
                ref={sliderRef}
                className="card-container flex overflow-x-scroll scroll-snap-x-mandatory scroll-snap-type-x-mandatory -webkit-overflow-scrolling-touch mx-auto w-full h-72"
            >
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="card flex-shrink-0 w-52 h-72 bg-gray-200 rounded-lg shadow-md scroll-snap-align-center ml-2"
                    >
                        {card.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sliders;

// <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Card Slider</title>
//     <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
//     <style>
//         /* Custom styles */
//         .card-container {
//             display: flex;
//             overflow-x: scroll;
//             scroll-snap-type: x mandatory;
//             -webkit-overflow-scrolling: touch; /* For smooth scrolling on iOS */
//             margin-left: auto;
//             margin-right: auto;
//             width: 100%;
//             height: 300px; /* Adjust as needed */
//         }

//         .card {
//             flex: 0 0 auto;
//             width: 200px; /* Adjust as needed */
//             height: 300px; /* Adjust as needed */
//             background-color: #f0f0f0;
//             border-radius: 10px;
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//             scroll-snap-align: center;
//             margin-left: 10px;
//         }

//         /* Left and Right buttons */
//         .slider-btn {
//             position: absolute;
//             top: 50%;
//             transform: translateY(-50%);
//             background-color: rgba(0, 0, 0, 0.5);
//             color: white;
//             border: none;
//             border-radius: 50%;
//             width: 40px;
//             height: 40px;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             cursor: pointer;
//             z-index: 999;
//         }

//         .slider-btn.left {
//             left: 20px;
//         }

//         .slider-btn.right {
//             right: 20px;
//         }
//     </style>
// </head>

// <body className="bg-gray-200">
//     <div className="relative">
//         <button className="slider-btn left">&lt;</button>
//         <button className="slider-btn right">&gt;</button>
//         <div className="card-container">
//             <div className="card">Card 1</div>
//             <div className="card">Card 2</div>
//             <div className="card">Card 3</div>
//             <div className="card">Card 4</div>
//             <div className="card">Card 5</div>
//             <div className="card">Card 6</div>
//             <div className="card">Card 7</div>
//             <div className="card">Card 8</div>
//             <div className="card">Card 9</div>
//         </div>
//     </div>
// </body>

// </html>
