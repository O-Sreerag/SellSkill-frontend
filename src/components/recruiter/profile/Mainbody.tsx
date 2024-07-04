import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../../redux/store";
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { FaUserTie } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6";
import { LuPhone, LuShieldCheck, LuTrash2 } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { FiMail } from "react-icons/fi";
import { PiCrown } from "react-icons/pi";
import { api } from "../../../services/axios";
import { updateUserProfile } from "../../../redux/slices/userAuthSlice";

interface RecruiterProfie {
    companyName: string
    industry: string
    headquarters: string
    ceo: string
    founded: string
    employees: string
    revenue: string
}

const Mainbody = () => {
    const [img, setImage] = useState(null)
    const [editClicked, setEditClicked] = useState(false)
    const { userName = 'Name', userEmail = 'email', userProfile = { companyName: "", industry: "", headquarters: "", ceo: "", founded: "", employees: "", revenue: "" } } = useSelector((state: AppRootState) => state.user)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [profile, setProfile] = useState<RecruiterProfie>({ companyName: "", industry: "", headquarters: "", ceo: "", founded: "", employees: "", revenue: "" })
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("userProfile")
        console.log(userProfile)

        console.log("setImage", setImage)
    }, [userProfile])

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching user profile")
            try {
                const response = await api.get(`/auth/recruiter/get`)
                console.log(response.data)
                const data = response.data.result;
                if (data?.profile) {
                    setProfile(data.profile)
                    dispatch(updateUserProfile(data.profile));
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required('Company Name is required'),
        industry: Yup.string().required('Industry is required'),
        headquarters: Yup.string().required('Headquarters is required'),
        ceo: Yup.string().required('CEO is required'),
        founded: Yup.string().required('Founded is required'),
        employees: Yup.string().required('Number of Employees is required'),
        revenue: Yup.string().required('Revenue is required'),
    });

    const handleEditClicked = (e: any) => {
        e.preventDefault()
        console.log("handleEditClicked")
        setEditClicked(prevValue => !prevValue)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        console.log("handleSubmit")
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const formDataObject: any = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        const {
            companyName,
            industry,
            headquarters,
            ceo,
            founded,
            employees,
            revenue,
        } = formDataObject;

        try {
            await validationSchema.validate({
                companyName,
                industry,
                headquarters,
                ceo,
                founded,
                employees,
                revenue,
            }, { abortEarly: false });

            const response = await api.post('/auth/recruiter/update', {profile: formDataObject});
            console.log(response.data)
            if (response.status === 200) {
                const data = response.data.user;
                console.log("Profile updated successfully")
                console.log(data)
                if (data?.profile) {
                    dispatch(updateUserProfile(data.profile));
                }
                toast.success("Profile updated successfully");
                setEditClicked(prevValue => !prevValue);
            } else {
                throw new Error('API request failed');
            }
        } catch (validationErrors: any) {
            if (validationErrors instanceof Yup.ValidationError) {
                const errorsObject: { [key: string]: string } = {};
                validationErrors.inner.forEach((error: any) => {
                    if (!errorsObject[error.path]) {
                        errorsObject[error.path] = error.message;
                    }
                });
                setErrors(errorsObject);
                toast.error('Please correct the form errors and try again.');
            } else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        }
    }

    const handleCanceled = (e: any) => {
        e.preventDefault()
        console.log("handleCanceled")
        setEditClicked(prevValue => !prevValue)
    }

    return (
        <div className="w-full space-y-10">
            <div className="bg-white shadow-md w-full rounded-md border border-gray-200">
                <div className="flex justify-between items-center w-full p-5">
                    <div className="flex justify-between items-center gap-2">
                        <div>
                            {
                                img ? (
                                    <img src="" alt="" />
                                ) : (
                                    <div className="rounded-full border-gray-700 border p-1">
                                        <FaUserTie className='text-3xl text-gray-700 rounded-full' />
                                    </div>
                                )
                            }
                        </div>
                        <div>
                            <h2 className="text-xl text-black">{userName}</h2>
                            <p className="text-sm">{userEmail}</p>
                        </div>
                    </div>
                    {
                        !editClicked &&
                        <div>
                            <button className="bg-[#3bd38a] px-5 py-2 rounded-md focus:outline-none" onClick={handleEditClicked}>
                                <p className="text-white text-sm">edit</p>
                            </button>
                        </div>
                    }
                </div>
                <hr />
                <div className="px-5 pt-2">
                    <h3 className="text-xl text-black">Company Info</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    {
                        editClicked ? (
                            <div className="p-5 space-y-4">
                                <div className="p-5 grid lg:grid-cols-3 md:grid-cols-2 gap-5">
                                    <div>
                                        <p className="text-sm">Company Name</p>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={profile?.companyName}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500"
                                            placeholder="Company name"
                                        />
                                        {errors.companyName && <div className="pt-1"><p className="text-red-500 text-sm">{errors.companyName}</p></div>}
                                    </div>
                                    <div>
                                        <p className="text-sm">Industry</p>
                                        <input
                                            type="text"
                                            name="industry"
                                            value={profile?.industry}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500"
                                            placeholder="Industry"
                                        />
                                        {errors.industry && <div className="pt-1"><p className="text-red-500 text-sm">{errors.industry}</p></div>}
                                    </div>
                                    <div>
                                        <p className="text-sm">Headquarters</p>
                                        <input
                                            type="text"
                                            name="headquarters"
                                            value={profile?.headquarters}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500"
                                            placeholder="headquarters"
                                        />
                                        {errors.headquarters && <div className="pt-1"><p className="text-red-500 text-sm">{errors.headquarters}</p></div>}
                                    </div>
                                    <div>
                                        <p className="text-sm">CEO</p>
                                        <input
                                            type="text"
                                            name="ceo"
                                            value={profile?.ceo}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500"
                                            placeholder="ceo"
                                        />
                                        {errors.ceo && <div className="pt-1"><p className="text-red-500 text-sm">{errors.ceo}</p></div>}
                                    </div>
                                    <div>
                                        <p className="text-sm">Founded</p>
                                        <input
                                            type="text"
                                            name="founded"
                                            value={profile?.founded}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500"
                                            placeholder="founded"
                                        />
                                        {errors.founded && <div className="pt-1"><p className="text-red-500 text-sm">{errors.founded}</p></div>}
                                    </div>
                                    <div>
                                        <p className="text-sm">Number of Employees</p>
                                        <input
                                            type="text"
                                            name="employees"
                                            value={profile?.employees}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500"
                                            placeholder="employees"
                                        />
                                        {errors.employees && <div className="pt-1"><p className="text-red-500 text-sm">{errors.employees}</p></div>}
                                    </div>
                                    <div>
                                        <p className="text-sm">Revenue</p>
                                        <input
                                            type="text"
                                            name="revenue"
                                            value={profile?.revenue}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500"
                                            placeholder="revenue"
                                        />
                                        {errors.revenue && <div className="pt-1"><p className="text-red-500 text-sm">{errors.revenue}</p></div>}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="bg-[#3bd38a] px-5 py-2 rounded-md">
                                        <p className="text-white text-sm">save</p>
                                    </button>
                                    <button className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-md" onClick={handleCanceled}>
                                        <p className="text-black text-sm">cancel</p>
                                    </button>
                                </div>
                            </div>
                        ) : (

                            userProfile.companyName != "" ? (
                                <div className="p-5 grid lg:grid-cols-3 md:grid-cols-2 gap-10">
                                    <div>
                                        <p className="text-sm">Company Name</p>
                                        <h2 className="text-base text-black">{userProfile?.companyName}</h2>
                                    </div>
                                    <div>
                                        <p className="text-sm">Industry</p>
                                        <h2 className="text-base text-black">{userProfile?.industry}</h2>
                                    </div>
                                    <div>
                                        <p className="text-sm">Headquarters</p>
                                        <h2 className="text-base text-black">{userProfile?.headquarters}</h2>
                                    </div>
                                    <div>
                                        <p className="text-sm">CEO</p>
                                        <h2 className="text-base text-black">{userProfile?.ceo}</h2>
                                    </div>
                                    <div>
                                        <p className="text-sm">Founded</p>
                                        <h2 className="text-base text-black">{userProfile?.founded}</h2>
                                    </div>
                                    <div>
                                        <p className="text-sm">Number of Employees</p>
                                        <h2 className="text-base text-black">{userProfile?.employees}</h2>
                                    </div>
                                    <div>
                                        <p className="text-sm">Revenue</p>
                                        <h2 className="text-base text-black">{userProfile?.revenue}</h2>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full flex flex-col items-center py-10">
                                    <img src="/404-5.png" alt="404" />
                                    <div className="flex flex-col justify-center items-center">
                                        <h3 className="text-lg font-semibold text-blue-gray-600">Whoops!!</h3>
                                        <p className="text-sm text-blue-gray-600">Profile not updated</p>
                                    </div>
                                </div>
                            )
                        )
                    }
                </form>
            </div >

            <div className="bg-white shadow-md w-full rounded-md border border-gray-200">
                <div className="space-y-1 p-7">
                    <h2 className="text-xl text-black">My Email Addresses</h2>
                    <p className="text-sm">You can use the following email addresses to sign in to your account and also to reset your password if you ever forget it.</p>
                </div>
                <hr />
                <div className="">
                    <div className="flex justify-between items-center p-7 hover:bg-[#f8fafa]">
                        <div className="flex justify-between items-center gap-10">
                            <div className="flex justify-between items-center gap-2">
                                <div className="bg-[#2fdee4] p-3 rounded-full">
                                    <FiMail className="text-xl font-semibold text-white" />
                                </div>
                                <div>
                                    <h2 className="text-md text-black">{userEmail}</h2>
                                    <p className="text-sm">2 months ago</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <div className="cursor-pointer rounded-lg p-1 bg-[#c6f2f2]">
                                    <PiCrown className="text-[#2fdee4] text-lg" />
                                </div>
                                <div className="cursor-pointer rounded-lg p-1 bg-gray-100">
                                    <FcGoogle className="text-lg" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="p-3 hover:bg-gray-200 rounded-full cursor-pointer text-lg text-gray-700 hover:text-xl hover:text-gray-800">
                                <LuTrash2 />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center cursor-pointer px-7 py-3">
                    <div className="flex gap-1 text-blue-500 items-center text-sm">
                        <FaPlus />
                        <p className="text-red-500 text-sm">Add Email Address</p>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-md w-full rounded-md border border-gray-200">
                <div className="space-y-1 p-7">
                    <h2 className="text-xl text-black">My Mobile Numbers</h2>
                    <p className="text-sm">View and manage all of the mobile numbers associated with your account.</p>
                </div>
                <hr />
                <div className="">
                    <div className="flex justify-between items-center p-7 hover:bg-[#f8fafa]">
                        <div className="flex justify-between items-center gap-10">
                            <div className="flex justify-between items-center gap-2">
                                <div className="bg-[#d6a33cd5] p-3 rounded-full">
                                    <LuPhone className="text-xl font-semibold text-white" />
                                </div>
                                <div>
                                    <h2 className="text-md text-black">{userEmail}</h2>
                                    <p className="text-sm">2 months ago</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-2">
                                <div className="cursor-pointer rounded-lg p-1 bg-[#f2e0bdd5]">
                                    <LuShieldCheck className="text-[#d6a33cd5] text-lg" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="p-3 hover:bg-gray-200 rounded-full cursor-pointer text-lg text-gray-700 hover:text-xl hover:text-gray-800">
                                <LuTrash2 />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center cursor-pointer px-7 py-3">
                    <div className="flex gap-1 text-blue-500 items-center text-sm">
                        <FaPlus />
                        <p className="text-red-500 text-sm">Add Mobile Address</p>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Mainbody