import { useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdRadioButtonChecked } from "react-icons/md";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import axios from 'axios';

import Navbar from "./Navbar";
// import GoogleLoginButton from "./googleLogin";
import { AppRootState } from '../../redux/store';
import { resetForm, setEmail, setName, setPassword, setRole } from "../../redux/slices/userSignupSlice";

const AuthSignup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [conformPassword, setConformPassword] = useState<string>('')
    const [conformPasswordError, setConformPasswordError] = useState<string | null>(null)

    const {name, email, password, role} = useSelector((state: AppRootState) => state.userSignup)

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEmail(event.target.value))
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setName(event.target.value))
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPassword(event.target.value))
    };

    const handleConformPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConformPassword(event.target.value)
    };

    const handleOptionChange = (option: string) => {
        dispatch(setRole(option))
    };

    const handleNavigate = () => {
        navigate('/login')
    }

    // State to hold validation errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        name: Yup.string().min(3, 'Name must be atleast 3 characters').max(10, 'Name cannot exceed 10 characters').required('Name is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleSignup = async () => {
        setErrors({});
        setConformPasswordError(null)
        try {
            // Validate form data against the schema
            await validationSchema.validate({ name, email, password }, { abortEarly: false });

            // conform password
            if(password !== conformPassword) {
                setConformPasswordError("passwords do not match")
                return;
            }

            const isGoogle = false
            // If validation succeeds, submit the form
            const response = await axios.post(`https://sellskill.hawkinvoice.online/auth/${role}/signup`, { name, email, password, isGoogle})

            // Check if the signup was successful
            if (response.status === 200) {
                console.log(response.data)
                const user = response.data.user
                console.log(user)
                console.log("user has successfully signup")

                const otherResponse = await axios.post('https://sellskill.hawkinvoice.online/auth/common/sendMail', {
                    name,
                    email,
                    role
                });

                if(otherResponse.status === 200) {
                    console.log("data has sent to backend")
                    toast.success('Signup Success. verification email send');
                    navigate(`/login`);
                } else {                    
                    console.log("email senting failed")
                }

            } else {
                dispatch(resetForm())
                toast.error('Signup failed. Please try again later.');
            }

        } catch (validationErrors: any) {
            // If validation fails, set the errors state with the validation errors
            const errorsObject: { [key: string]: string } = {};
            if (validationErrors instanceof Yup.ValidationError) {
                validationErrors.inner.forEach((error: any) => {
                    if (!errorsObject[error.path]) {
                        errorsObject[error.path] = error.message;
                    }
                });
            }
            setErrors(errorsObject);
            toast.error('Please correct the form errors and try again.');
        }
    };

    return (
      <div className="bg-white min-h-screen flex justify-center items-center">
        <Navbar/>
        <div className="max-w-[900px] w-full bg-white p-8 rounded-lg flex flex-col justify-center items-center">

            <div className="flex flex-col justify-center items-center">
                <div className="mb-4 max-w-[500px] p-1 text-center"> 
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl barlow-light text-[#151B26] mb-2 leading-loose tracking-wide">
                    You're one click away<br/> from less busywork
                    </h3>
                </div>
                <div className="max-w-[450px] min-w-[450px] p-5">
                    {/* <GoogleLoginButton/>     */}
                    {/* <div className="mb-1 flex items-center">
                        <div className="border-b border-gray-400 w-full"></div>
                        <div className="text-gray-500 text-xs px-4">OR</div>
                        <div className="border-b border-gray-400 w-full"></div>
                    </div> */}
                    <div className="mb-1 w-full">
                        <input 
                        type="text" 
                        className="border w-full border-gray-300 rounded-l-sm px-3 py-2 h-12 mb-3 focus:outline-none"
                        placeholder="name@company.com"
                        value={email}
                        onChange={handleEmailChange}
                        />
                        {errors.email && <div className="text-red-500">{errors.email}</div>}
                        <input 
                        type="text" 
                        className="border w-full border-gray-300 rounded-l-sm px-3 py-2 h-12 mb-3 focus:outline-none"
                        placeholder="name"
                        onChange={handleNameChange}
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                        <input 
                        type="password" 
                        className="border w-full border-gray-300 rounded-l-sm px-3 py-2 h-12 mb-3 focus:outline-none"
                        placeholder="password"
                        value={password}
                        onChange={handlePasswordChange}
                        />
                        {errors.password && <div className="text-red-500">{errors.password}</div>}
                        <div className="flex w-full">
                            <input
                            type="password"
                            className="border border-gray-300 rounded-l-sm px-3 py-2 w-3/5 h-12 mb-3 focus:outline-none"
                            placeholder="conform password"
                            value={conformPassword}
                            onChange={handleConformPasswordChange}
                            />
                            <button className="bg-black hover:bg-[#ed4758] text-white font-bold py-2 px-4 rounded-r-sm w-2/5 h-12" onClick={handleSignup}>
                            Signup
                            </button>
                        </div>
                        {conformPasswordError && <div className="text-red-500">{conformPasswordError}</div>}
                    </div>
                    <div className="flex gap-3 justify-start w-full">
                        <div
                            className={`cursor-pointer text-sm flex items-center gap-1 ${
                                role === "recruiter" ? "text-blue-500" : "text-gray-600"
                            }`}
                            onClick={() => handleOptionChange("recruiter")}
                            >
                            {role === "recruiter" ? (
                                <MdRadioButtonChecked />
                            ) : (
                                <MdOutlineRadioButtonUnchecked />
                            )}
                            <span>Recruiter</span>
                        </div>
                            <div
                            className={`cursor-pointer text-sm flex items-center gap-1 ${
                                role === "applicant" ? "text-blue-500" : "text-gray-600"
                            }`}
                            onClick={() => handleOptionChange("applicant")}
                            >
                            {role === "applicant" ? (
                                <MdRadioButtonChecked />
                            ) : (
                                <MdOutlineRadioButtonUnchecked />
                            )}
                            <span>Applicant</span>
                        </div>
                    </div>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                    Already have an account? <a href="" className="underline" onClick={handleNavigate}>Log in instead</a>
                </div>
            </div>

            <div className="mt-8 max-w-[700px]">
                <ul  className="flex list-inside text-sm text-gray-600 gap-6">
                    <li className="flex gap-3 items-center"><IoIosCheckmarkCircleOutline size={"60px"}/><p>Get access to unlimited tasks, projects, and storage.</p></li>
                    <li className="flex gap-3 items-center"><IoIosCheckmarkCircleOutline size={"60px"}/><p>See different views like list, board, and calendar.</p></li>
                    <li className="flex gap-3 items-center"><IoIosCheckmarkCircleOutline size={"60px"}/><p>Invite your teammates to explore Asana.</p></li>
                </ul>
            </div>

        </div>
      </div>
    );
  };
  
  export default AuthSignup;