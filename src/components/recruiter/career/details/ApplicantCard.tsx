import { useState } from "react";
import { RiUserForbidFill, RiUserReceivedFill, RiUserStarFill, RiUserUnfollowFill } from "react-icons/ri";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { AppRootState } from "../../../../redux/store";
import { api } from "../../../../services/axios";

interface applicantsCardData {
    id?: number;
    _id?: string;
    name?: string;
    email: string;
    password: string;
    image?: string;
    phoneNo?: number;
    applications?: string;
    events?: string;
    verified?: boolean;
    status?: boolean;
    isGoogle: boolean;
    careers?: string[];
}

function ApplicantCard({ applicantData, connectedStatus }: {
    applicantData: applicantsCardData;
    connectedStatus: string; // enum [selected, archived, rejected, unread]
}) {
    console.log(applicantData, connectedStatus)

    // const navigate = useNavigate();
    const [showStatus, setShowStatus] = useState(false)
    const { userEmail, userRole } = useSelector((state: AppRootState) => state.user);

    const handleConnect = async () => {
        try {
            // creating room
            const response = await api.post(`/chat/room/create?user1=${userEmail}&user2=${applicantData._id}&createdBy=${userRole}`)
            console.log(response.data)
            const data = response.data.result;
            console.log(data)

        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    return (
        <div className="p-3 flex justify-between items-center text-sm hover:bg-[#f5f8fa] text-gray-700 border-gray-200 border-2 rounded-md shadow-sm">
            <div className="flex gap-2 items-center">
                <div>
                    <div className="cursor-pointer"
                        onClick={() => { showStatus ? setShowStatus(false) : setShowStatus(true) }}>
                        {
                            connectedStatus == "selected" ? (
                                <RiUserStarFill className="text-4xl text-green-500 bg-green-50 border border-green-500 rounded-full p-2" />
                            ) : (
                                connectedStatus == "archived" ? (
                                    <RiUserReceivedFill className="text-4xl text-blue-500 bg-blue-50 border border-blue-500 rounded-full p-2" />
                                ) : (
                                    connectedStatus == "rejected" ? (
                                        <RiUserForbidFill className="text-4xl text-red-500 bg-red-50 border border-red-500 rounded-full p-2" />
                                    ) : (
                                        <RiUserUnfollowFill className="text-4xl text-gray-500 bg-gray-50 border border-gray-500 rounded-full p-2" />
                                    )
                                )
                            )
                        }
                    </div>
                </div>
                <div>
                    <p className="text-base font-semibold">{applicantData.name}</p>
                    <p>{applicantData.email}</p>
                </div>
            </div>
            <div className="flex w-1/2 items-center justify-between">
                <p>Exp: 3Yrs, <span className="text-green-400 font-semibold"> 97% </span>qualified</p>
                <button
                    className="rounded-md border px-2 py-[0.15rem] focus:outline-none shadow-md hover:bg-[#b0d5eb] hover:text-white text-blue-500"
                    onClick={handleConnect}>
                    <p>connect</p>
                </button>
            </div>
        </div>
    );
}

export default ApplicantCard;
