import { useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

// import Signup from "./signup";
import Navbar from "./Navbar";
import GoogleLoginButton from "./googleLogin";
import axios from "axios";
import { AppRootState } from '../../redux/store';
import { recruiterLogin } from "../../redux/slices/recruiterAuthSlice";
import { Recruiter } from '../../types/recruiterData';
import { applicantLogin } from "../../redux/slices/applicantAuthSlice";

const AuthLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {role} = useSelector((state: AppRootState) => state.userSignup)

    const resetForm = () => {
        setEmail("")
        setPassword("")
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    // State to hold validation errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });
      
    const handleLogin = async () => {
        try {
            // Validate form data against the schema
            await validationSchema.validate({ email, password }, { abortEarly: false });

            // If validation succeeds, submit the form
            const response = await axios.post(`http://sellskill.online/auth/common/login`, { email, password})
            console.log(response);

            // // Check if the signup was successful
            if (response.status === 200) {
                console.log("response.data")
                console.log(response.data)
                
                const token = response.data.token;
                console.log("token : ", token)
                localStorage.setItem('token', token);

                const user = response.data.user
                console.log("user : ", user)
                
                // // setting up user global data to be accessed from everywhere
                if(role == "recruiter") {
                    dispatch(recruiterLogin({ isAuthenticated: true, recruiterEmail: user.email, recruiterName: user.name, recruiterImage: user.image}));
                } else {
                    dispatch(applicantLogin({ isAuthenticated: true, applicantEmail: user.email, applicantName: user.name, applicantImage: user.image}));
                }
                resetForm()
                
                toast.success(`${role} successfully logged in!`);
                navigate(`/${role}/career`);

            }  else {
                resetForm();

                if (response.data && response.data.error) {
                    toast.error(response.data.error);
                } else {
                    toast.error('Login failed. Please try again later.');
                }
            }

        } catch (validationErrors: any) {
            if (validationErrors.response && validationErrors.response.data && validationErrors.response.data.error) {
                toast.error(validationErrors.response.data.error);
            }

            // If validation fails, set the errors state with the validation errors
            const errorsObject: { [key: string]: string } = {};
            if (validationErrors instanceof Yup.ValidationError) {
                validationErrors.inner.forEach((error: any) => {
                    if (!errorsObject[error.path]) {
                        errorsObject[error.path] = error.message;
                    }
                });
                toast.error('Please correct the form errors and try again.');
            }
            setErrors(errorsObject);
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
                    {/* <GoogleLoginButton/> */}
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
                        <div className="flex w-full">
                            <input
                            type="password"
                            className="border border-gray-300 rounded-l-sm px-3 py-2 w-3/5 h-12 mb-3 focus:outline-none"
                            placeholder="password"
                            value={password}
                            onChange={handlePasswordChange}
                            />
                            <button className="bg-black hover:bg-[#ed4758] text-white font-bold py-2 px-4 rounded-r-sm w-2/5 h-12" onClick={handleLogin}>
                            Login
                            </button>
                        </div>
                        {errors.password && <div className="text-red-500">{errors.password}</div>}
                    </div>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                    Already have an account? <a href="#" className="underline">Sign up instead</a>
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
  
export default AuthLogin;

