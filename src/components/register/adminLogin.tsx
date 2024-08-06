import { useState } from "react";
// import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
// import { jwtDecode } from "jwt-decode";

import Navbar from "./Navbar";
import axios from "axios";
// import { AppRootState } from '../../redux/store';
import { adminLogin } from "../../redux/slices/adminAuthSlice";

const AuthLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            await validationSchema.validate({ email, password }, { abortEarly: false });

            console.log("trying to login admin")
            const response = await axios.post(`http://sellskill.zapto.org/auth/admin/login`, { email, password })
            console.log(response);

            if (response.status === 200) {
                console.log("response.data")
                console.log(response.data)

                const adminToken = response.data.adminToken;
                console.log("adminToken : ", adminToken)
                localStorage.setItem('adminToken', adminToken);
                const user = response.data.user
                console.log("admin : ", user)

                // // setting up user global data to be accessed from everywhere
                dispatch(adminLogin({ isAuthenticated: true, adminEmail: user.email }));
                resetForm()

                toast.success(`Admin successfully logged in!`);
                navigate(`/admin/home`);
            } else {
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
            <Navbar />
            <div className="max-w-[900px] w-full bg-white p-8 rounded-lg flex flex-col justify-center items-center">

                <div className="flex flex-col justify-center items-center border-2 px-1 py-5">
                    <div className="mb-4 max-w-[500px] p-1 text-center">
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl barlow-light text-[#151B26] mb-2 leading-loose tracking-wide">
                            You're one click away<br /> from less busywork
                        </h3>
                    </div>
                    <div className=" p-5">
                        <div className="mb-1 w-full">
                            <input
                                type="text"
                                className="border w-full border-gray-300 rounded-l-sm px-3 py-2 h-12 mb-3 focus:outline-none"
                                placeholder="admin@gmail.com"
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
                </div>

            </div>
        </div>
    );
};

export default AuthLogin;

