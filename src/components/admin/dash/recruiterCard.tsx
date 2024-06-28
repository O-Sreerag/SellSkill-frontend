import { useState } from "react";
import { RiUserForbidFill, RiUserReceivedFill, RiUserStarFill, RiUserUnfollowFill } from "react-icons/ri";
import { adminApi } from "../../../services/axios";

interface recruitersCardData {
    id?: number;
    _id?:string;
    name?: string;
    email: string;
    password: string;
    phoneNo?: number;
    url?: string;
    jobRoles?: string[];
    profile?: string;
    verified?: boolean;
    status?: boolean;
    isGoogle: boolean;
}

function RecruiterCard({ recruiterData, connectedStatus }: {
    recruiterData: recruitersCardData;
    connectedStatus: string; // enum [selected, archived, rejected, unread]
}) {
    console.log(recruiterData, connectedStatus)

    const [status, setStatus] = useState(recruiterData.status)
    const [recruiter, setRecruiter] = useState(recruiterData)

    const handleBlock = async () => {
        console.log("handle Block")
        try {
            console.log("Fetch recruiters and recruiter")
            const response = await adminApi.get(`/auth/recruiter/block?recruiterId=${recruiterData._id}`);
            setStatus(response.data?.result?.status)
            setRecruiter(response.data.result)

            if (response.status == 200) {
                console.log(response.data.result)
            }
        } catch (error) {
            console.error('Error handling block:', error);
        }
    }

    return (
        <div className="cursor-pointer p-3 flex justify-between items-center text-sm hover:bg-[#f5f8fa] text-gray-700 border-gray-200 border-2 rounded-md shadow-sm">
            <div className="flex gap-2 items-center">
                <div>
                    <div className="cursor-pointer">
                        {
                            status == false ? (
                                <RiUserStarFill className="text-4xl text-green-500 bg-green-50 border border-green-500 rounded-full p-2" />
                            ) : (
                                <RiUserForbidFill className="text-4xl text-red-500 bg-red-50 border border-red-500 rounded-full p-2" />
                            )
                        }
                    </div>
                </div>
                <div>
                    <p className="text-base font-semibold">{recruiterData.name}</p>
                    <p>{recruiterData.email}</p>
                </div>
            </div>
            <div className="flex w-1/2 items-center justify-between">
                {
                    status ? (
                        <p>User is, <span className="text-red-400 font-semibold"> blocked </span></p>
                    ) : (
                        <p>User is, <span className="text-green-400 font-semibold"> active </span></p>
                    )
                }
                <button
                    className="rounded-md border px-2 py-[0.15rem] shadow-sm focus:outline-none"
                    onClick={handleBlock}>
                    {
                        status ? (
                            <p className="text-green-500"> unblock </p>
                        ) : (
                            <p className="text-red-500"> block </p>
                        )
                    }
                </button>
            </div>
        </div>
    );
}

export default RecruiterCard;
