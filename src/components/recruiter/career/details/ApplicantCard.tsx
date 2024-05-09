import { RiUserForbidFill, RiUserReceivedFill, RiUserStarFill, RiUserUnfollowFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function ApplicantCard({ applicantData, connectedStatus }: {
    applicantData: any;
    connectedStatus: string; // enum [selected, archived, rejected, unread]
}) {
    console.log(applicantData, connectedStatus)

    const navigate = useNavigate();

    // const handleClick = () => {
    //     navigate(`/recruiter/career/details?id=${id}`);
    // };

    return (
        <div className="p-4 flex justify-between items-end text-sm hover:bg-[#f5f8fa] text-gray-700 border-gray-200 border-2 rounded-md shadow-sm">
        <div className="flex gap-2 items-center">
            <div>
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
            <div>
                <p className="text-base font-semibold">Sreerag O</p>
                <p>sreerag@gmail.com</p>
            </div>
        </div>
        <div className="space-x-2">
            Exp: 3Yrs, <span className="text-red-400 font-semibold"> 37% </span>qualified
            <button className="rounded-md border px-3 py-1">connect</button>
        </div>
    </div>
    );
}

export default ApplicantCard;