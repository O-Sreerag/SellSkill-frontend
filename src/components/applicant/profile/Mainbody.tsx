import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { FaUserTie } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6";
import { LuPhone, LuShieldCheck, LuTrash2 } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { FiMail } from "react-icons/fi";
import { PiCrown } from "react-icons/pi";
import { AppRootState } from "../../../redux/store";
import { api } from "../../../services/axios";
import { updateUserProfile } from "../../../redux/slices/userAuthSlice";

interface ApplicantProfie {
    fullName: string
    age: string
    gender: string
    country: string
    region: string
}


const Mainbody = () => {
    const [img, setImage] = useState(null)
    const [editClicked, setEditClicked] = useState(false)
    const { userName = 'Name', userEmail = 'email', userProfile = { fullName: "", age: "", gender: "", country: "", region: "" } } = useSelector((state: AppRootState) => state.user)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [profile, setProfile] = useState<ApplicantProfie>({ fullName: "", age: "", gender: "", country: "", region: "" })
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("userProfile")
        console.log(userProfile)
    }, [userProfile])

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching user profile")
            try {
                const response = await api.get(`/auth/applicant/get`)
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
        console.log("handle change")
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required'),
        age: Yup.string().required('age is required'),
        gender: Yup.string().required('gender is required'),
        country: Yup.string().required('country is required'),
        region: Yup.string().required('region is required'),
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
            fullName,
            age,
            gender,
            country,
            region
        } = formDataObject;

        try {
            await validationSchema.validate({
                fullName,
                age,
                gender,
                country,
                region
            }, { abortEarly: false });

            const response = await api.post('/auth/applicant/update', {profile: formDataObject});
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
                                    <div className="">
                                        <FaUserTie className='text-4xl text-gray-700 border-gray-700 border rounded-full' />
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
                            <button className="bg-[#3bd38a] px-5 py-2 rounded-md" onClick={handleEditClicked}>
                                <p className="text-white text-sm">edit</p>
                            </button>
                        </div>
                    }
                </div>
                <form onSubmit={handleSubmit}>

                    {
                        editClicked ? (
                            <div className="p-5 space-y-4">
                                <div className="grid grid-cols-2 gap-10">
                                    <div>
                                        <p className="text-sm">Full Name</p>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={profile?.fullName}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500"
                                            placeholder="Full name"
                                        />
                                        {errors.fullName && <div className="pt-1"><p className="text-red-500 text-sm">{errors.fullName}</p></div>}
                                    </div>
                                    <div>
                                        <p className="text-sm">Age</p>
                                        <input
                                            type="text"
                                            name="age"
                                            value={profile?.age}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500"
                                            placeholder="Age"
                                        />
                                        {errors.age && <div className="pt-1"><p className="text-red-500 text-sm">{errors.age}</p></div>}
                                    </div>
                                    <div>
                                        <p className="text-sm">Gender</p>
                                        <input
                                            type="text"
                                            name="gender"
                                            value={profile?.gender}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500"
                                            placeholder="Gender"
                                        />
                                        {errors.gender && <div className="pt-1"><p className="text-red-500 text-sm">{errors.gender}</p></div>}
                                    </div>
                                    <div>
                                        <p className="text-sm">Country</p>
                                        <input
                                            type="text"
                                            name="country"
                                            value={profile?.country}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500"
                                            placeholder="Country"
                                        />
                                        {errors.country && <div className="pt-1"><p className="text-red-500 text-sm">{errors.country}</p></div>}
                                    </div>
                                    <div>
                                        <p className="text-sm">Region</p>
                                        <input
                                            type="text"
                                            name="region"
                                            value={profile?.region}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-blue-500"
                                            placeholder="Region"
                                        />
                                        {errors.region && <div className="pt-1"><p className="text-red-500 text-sm">{errors.region}</p></div>}
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
                            userProfile.fullName != "" ? (
                                <div className="p-5 grid grid-cols-2 gap-10">
                                    <div>
                                        <p className="text-sm">full name</p>
                                        <h2 className="text-base text-black">{userProfile?.fullName}</h2>
                                    </div>
                                    <div>
                                        <p className="text-sm">age</p>
                                        <h2 className="text-base text-black">{userProfile?.age}</h2>
                                    </div>
                                    <div>
                                        <p className="text-sm">gender</p>
                                        <h2 className="text-base text-black">{userProfile?.gender}</h2>
                                    </div>
                                    <div>
                                        <p className="text-sm">country</p>
                                        <h2 className="text-base text-black">{userProfile?.country}</h2>
                                    </div>
                                    <div>
                                        <p className="text-sm">region</p>
                                        <h2 className="text-base text-black">{userProfile?.region}</h2>
                                    </div>
                                </div >
                            ) : (
                                <div className="w-full flex flex-col items-center py-10">
                                    <img src="/public/404-5.png" alt="404" />
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
                                    <h2 className="text-md text-black">sreeragjohny@gmail.com</h2>
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
                        <p className="">Add Email Address</p>
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
                                    <h2 className="text-md text-black">sreeragjohny@gmail.com</h2>
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
                        <p className="">Add Mobile Address</p>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Mainbody