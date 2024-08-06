import { useState, useEffect} from 'react';
import { useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

function GoogleLoginButton() {
    const [ user, setUser ] = useState<any>([]);
    
    const navigate = useNavigate()
    
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse)

            const google_token = codeResponse.access_token;
            console.log("google_token : ", google_token)
            localStorage.setItem('google_token', google_token);
            console.log(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });
    
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const userinfoRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    });
                    console.log(userinfoRes)
                    
                    const googleLoginRes = await axios.get(`://sellskill.zapto.org/auth/googleLogin?access_token=${user.access_token}`);
                    console.log(googleLoginRes.data);
                    
                    if (googleLoginRes.data.role === "recruiter") {
                        navigate('/recruiter/home');
                    } else {
                        navigate('/applicant/home');
                    }
    
                } catch (error) {
                    console.log(error);
                }
            }
        };
        
        fetchData();
    }, [user]);    
    
    return (
        <div>
            <div className="mb-1">
                <button  onClick={() => login()} className='relative bg-[#4285f4] hover:bg-[#3e77f3] w-full h-12 text-white font-bold py-2 px-1 rounded flex items-center'>
                    <FcGoogle className=" h-10 w-10 bg-white rounded p-2"/>
                    <span className="pl-10">Continue with your Google Account</span>
                </button>
            </div>
        </div>
    );
}
export default GoogleLoginButton;


    {/* {profile ? (
        <div>
        <img src={profile.picture} alt="user image" />
        <h3>User Logged in</h3>
        <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button onClick={logOut}>Log out</button>
            </div>
    ) : (
        <div className="mb-1">
            <button  onClick={() => login()} className='relative bg-[#4285f4] hover:bg-[#3e77f3] w-full h-12 text-white font-bold py-2 px-1 rounded flex items-center'>
            <FcGoogle className=" h-10 w-10 bg-white rounded p-2"/>
            <span className="pl-10">Continue with your Google Account</span>
                </button>
                </div>
            )} */}
            
            // // log out function to log the user out of google and set the profile array to null
            // const logOut = () => {
                //     googleLogout();
                    //     setProfile(null);
                    // };
                    // const [ profile, setProfile ] = useState<Profile | null>(null);
                    
                    // interface Profile {
                    //     picture: string;
                    //     name: string;
                    //     email: string;
                    // }