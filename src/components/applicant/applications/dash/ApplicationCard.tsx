import { useState } from "react";
import { RiUserForbidFill, RiUserReceivedFill, RiUserStarFill } from "react-icons/ri";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { AppRootState } from "../../../../redux/store";
import { api } from "../../../../services/axios";

enum DropDownValues {
    All = "all",
    Accepted = "accepted",
    Rejected = "rejected",
    Pending = "pending",
}

interface applicationsCardData {
    id?: number;
    _id: string;
    applicantId: string;
    careerId: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_no: string;
    dob: Date;
    gender: string;
    current_location: string;
    current_employer: string;
    current_ctc: number;
    experience: number;
    grad_year: Date;
    notice_period: number;
    expected_ctc: number;
    address: string;
    skill_set: string[];
    qualifications: string[];
    resume?: string;
    status?: string;
}

function ApplicationCard({ applicationData }: {
    applicationData: applicationsCardData;
}) {
    console.log(applicationData)
    
    // const navigate = useNavigate();
    const [showStatus, setShowStatus] = useState(false)
    const { userEmail, userRole } = useSelector((state: AppRootState) => state.user);
    const [connectedStatus, setConnectedStatues] = useState(applicationData.status)
    console.log("setConnectedStatues", setConnectedStatues)

    const handleConnect = async () => {
        try {
            // creating room
            const response = await api.post(`/chat/room/create?user1=${userEmail}&user2=${applicationData.applicantId}&createdBy=${userRole}`)
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
                            connectedStatus == DropDownValues.Accepted ? (
                                <RiUserStarFill className="text-4xl text-green-500 bg-green-50 border border-green-500 rounded-full p-2" />
                            ) : (
                                connectedStatus == DropDownValues.Rejected ? (
                                    <RiUserForbidFill className="text-4xl text-red-500 bg-red-50 border border-red-500 rounded-full p-2" />
                                ) : (
                                    <RiUserReceivedFill className="text-4xl text-gray-500 bg-gray-50 border border-gray-500 rounded-full p-2" />
                                )
                            )
                        }
                    </div>
                </div>
                <div>
                    <p className="text-base font-semibold">{applicationData.first_name} {applicationData.last_name}</p>
                    <p>{applicationData.email}</p>
                </div>
            </div>
            <div className="flex w-1/2 items-center justify-between">
                <p>Application Status :<span className="text-green-400 font-semibold"> {connectedStatus} </span></p>
                <button
                    className="rounded-md border px-2 py-[0.15rem] focus:outline-none shadow-md hover:bg-[#b0d5eb] hover:text-white text-blue-500"
                    onClick={handleConnect}>
                    <p>view</p>
                </button>
            </div>
        </div>
    );
}

export default ApplicationCard;
