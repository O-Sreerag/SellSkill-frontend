import React from 'react';
import { FaBell } from 'react-icons/fa';
import { RxCross1 } from "react-icons/rx";

interface AlertProps {
    onClose: () => void;
    onConfirm: () => void;
    page: string;
}

const Alert: React.FC<AlertProps> = ({ onClose, onConfirm, page }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-4 w-80 relative">
                <button className="absolute top-3 right-3" onClick={onClose}>
                    <RxCross1 />
                </button>
                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-gray-200 p-3 rounded-full">
                        <FaBell className="text-2xl text-gray-600" />
                    </div>
                    <h2 className="text-xl font-semibold">Stay up to Date</h2>
                    {
                        page=="career" ? 
                        <p className="text-gray-600 text-center">Profile not added. Complete your profile to create career openings.</p>
                        :
                        <p className="text-gray-600 text-center">Profile not added. Complete your profile to create Schedule openings.</p>
                    }
                    <button
                        onClick={onConfirm}
                        className="bg-black text-white py-2 px-4 rounded-md"
                    >
                        Complete Profile
                    </button>
                    <button
                        onClick={onClose}
                        className="text-gray-600"
                    >
                        No, Thanks
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Alert;
