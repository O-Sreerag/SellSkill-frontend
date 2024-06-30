import { useEffect, useState } from 'react'
import Navbar2 from '../Navbar2'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import { adminApi } from '../../../services/axios'
import ApplicantCard from './ApplicantCard'

// import { IoIosArrowDropdown, IoMdArrowDropdown } from 'react-icons/io'
// import { RiUserStarFill, RiUserUnfollowFill, RiUserReceivedFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { AppRootState } from '../../../redux/store'
import RecruiterCard from './recruiterCard'

enum DropDownValues {
    Applicants = "applicants",
    Recruiters = "recruiters"
}

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

interface recruitersCardData {
    id?: number;
    _id?: string;
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

const Mainbody = () => {
    // const navigate = useNavigate()
    const { adminEmail = "" } = useSelector((state: AppRootState) => state.admin)

    const [dropDownValue, setDropDownValue] = useState<DropDownValues>(DropDownValues.Applicants);
    const [applicantsCardData, setApplicantsCardData] = useState<applicantsCardData[]>([])
    const [recruitersCardData, setRecruitersCardData] = useState<recruitersCardData[]>([])
    // const [showStatus, setShowStatus] = useState(false)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetch applicants and recruiter")
                const applicantsResponse = await adminApi.get(`/auth/applicant/getAll`);
                const recruiterResponse = await adminApi.get(`/auth/recruiter/getAll`);

                if (applicantsResponse.status == 200) {
                    console.log(applicantsResponse.data.result)
                    console.log("applicants details")
                    const data2 = applicantsResponse.data.result;
                    setApplicantsCardData(data2.map((item: applicantsCardData, index: number) => ({
                        id: index + 1,
                        ...item
                    })));
                }
                if (recruiterResponse.status == 200) {
                    console.log(recruiterResponse.data.result)
                    console.log("recruiters details")
                    const data3 = recruiterResponse.data.result;
                    setRecruitersCardData(data3.map((item: recruitersCardData, index: number) => ({
                        id: index + 1,
                        ...item
                    })));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDropDownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDropDownValue(event.target.value as DropDownValues);
    };

    // const handleMouseEnter = (id: any) => {
    //     setHoveredCard(id);
    // };
    // const handleMouseLeave = () => {
    //     setHoveredCard(1);
    // };

    return (
        <div className="flex justify-center w-full bg-white">
            <div className='max-w-[1100px] lg:min-w-[1100px]'>
                <div className="items-center flex flex-col justify-between p-5">
                    <Navbar2 />
                    <div className="w-full space-y-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#2B2B2E] justify-start barlow-regular">Admin Dash board</h2>
                        <p className="text-gray-600">View and Manage Recruiters / Applicants</p>
                    </div>

                    <div className="flex justify-between w-full mt-16 border-b-2 pb-1">
                        <div className='flex gap-3'>
                            <div className='items-center flex'>
                                <div className='hover:ring-2 hover:ring-gray-300 rounded-full px-[13px] py-[8px] cursor-pointer text-sm bg-gray-400 text-white'>{adminEmail.charAt(0).toUpperCase()}</div>
                            </div>
                            <div>
                                <p className="text-blue-700 italic">{adminEmail}</p>
                                <p className="text-gray-600">all active {dropDownValue}</p>
                            </div>
                        </div>
                        <div className="flex w-full justify-end gap-2 items-center p-2">
                            <div>
                                <select
                                    value={dropDownValue}
                                    onChange={handleDropDownChange}
                                    className="text-sm p-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring-0 focus:bg-gray-100 hover:bg-gray-100"
                                >
                                    <option value={DropDownValues.Applicants}>Applicants</option>
                                    <option value={DropDownValues.Recruiters}>Recruiters</option>
                                </select>
                            </div>
                            <div>
                                <input type="search" className="rounded-lg border py-1 px-2 text-gray-400 focus:outline-none" placeholder="Search..." />
                            </div>
                        </div>
                    </div>

                    <div className={`py-4 space-y-2 w-full`}>
                        {
                            dropDownValue == DropDownValues.Applicants && applicantsCardData && (
                                <>
                                    {applicantsCardData.map((applicant) => (
                                        <ApplicantCard key={applicant._id} applicantData={applicant} connectedStatus="unread" />
                                    ))}
                                </>
                            )
                        }
                        {
                            dropDownValue == DropDownValues.Recruiters && recruitersCardData && (
                                <>
                                    {recruitersCardData.map((recruiter) => (
                                        <RecruiterCard key={recruiter._id} recruiterData={recruiter} connectedStatus="unread" />
                                    ))}
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mainbody