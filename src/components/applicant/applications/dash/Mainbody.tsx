import { useEffect, useState } from 'react'
import Navbar2 from '../../Navbar2'
// import axios from 'axios'
// import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../../../../services/axios'

// import { RxCross2 } from 'react-icons/rx'
// import { IoIosArrowDropdown, IoMdArrowDropdown } from 'react-icons/io'
// import { RiUserStarFill, RiUserUnfollowFill, RiUserReceivedFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { AppRootState } from '../../../../redux/store'
import ApplicationCard from "./ApplicationCard";

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
}

const Mainbody = () => {
    const [dropDownValue, setDropDownValue] = useState<DropDownValues>(DropDownValues.All);
    // const navigate = useNavigate()
    // const [isButtonTapped, setButtonTapped] = useState(false)
    // const { search } = useLocation();
    // const careerId = new URLSearchParams(search).get('id');
    const { userName = 'name', userEmail = 'email' } = useSelector((state: AppRootState) => state.user)
    const [applicationsCardData, setApplicationsCardData] = useState<applicationsCardData[]>([])

    // const [hoveredCard, setHoveredCard] = useState(1);
    // const [showStatus, setShowStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch applications for selected career
                const applicationsResponse = await api.get(`/career/application/getall`);
                const data2 = applicationsResponse.data.result;
                console.log("data2 :", data2)
                setApplicationsCardData(data2.map((item: applicationsCardData, index: number) => ({
                    id: index + 1,
                    ...item
                })));
                console.log("applications details")
                console.log(applicationsCardData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDropDownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDropDownValue(event.target.value as DropDownValues);
    };

    return (
        <div className="flex justify-center w-full bg-white">
            <div className='max-w-[1100px] lg:min-w-[1100px]'>
                <div className="items-center flex flex-col justify-between p-5">
                    <Navbar2 />

                    <div className="w-full space-y-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#2B2B2E] justify-start barlow-regular">Applications Management</h2>
                        <p className="text-gray-600">View all your applications</p>
                    </div>

                    <div className="flex justify-between w-full mt-16 border-b-2 pb-1">
                        <div className='flex gap-3'>
                            <div className='items-center flex'>
                                <div className='hover:ring-2 hover:ring-gray-300 rounded-full px-[13px] py-[8px] cursor-pointer text-sm bg-gray-400 text-white'>{userName.charAt(0).toUpperCase()}</div>
                            </div>
                            <div>
                                <p className="text-gray-600">{userName}</p>
                                <p className="text-blue-700 italic">{userEmail}</p>
                            </div>
                        </div>
                        <div className="flex w-full justify-end gap-2 items-center p-2">
                            <div>
                                <select
                                    value={dropDownValue}
                                    onChange={handleDropDownChange}
                                    className="text-sm p-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring-0 focus:bg-gray-100 hover:bg-gray-100"
                                >
                                    <option value={DropDownValues.All}>All</option>
                                    <option value={DropDownValues.Accepted}>Accepted</option>
                                    <option value={DropDownValues.Rejected}>Rejected</option>
                                    <option value={DropDownValues.Pending}>Pending</option>
                                </select>
                            </div>
                            <div>
                                <input type="search" className="rounded-lg border py-1 px-2 text-gray-400 focus:outline-none" placeholder="Search..." />
                            </div>
                        </div>
                    </div>

                    <div className={`py-4 space-y-2 w-full`}>
                        {
                            applicationsCardData && applicationsCardData.length >= 1 ? (
                                <>
                                    {applicationsCardData.map((application) => (
                                        <ApplicationCard key={application._id} applicationData={application}/>
                                    ))}
                                </>
                            ) : (
                                <div className="w-full pt-20">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src="/404-1.png" alt="404" />
                                        <h3 className="text-lg font-semibold text-blue-gray-600">Whoops!!</h3>
                                        <p className="text-sm text-blue-gray-600">No Applications has yet been recieved</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mainbody