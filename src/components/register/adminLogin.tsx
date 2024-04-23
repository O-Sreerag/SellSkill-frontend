import { useState, useEffect} from 'react';
import { googleLogout, useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

interface Profile {
    picture: string;
    name: string;
    email: string;
}

function GoogleLoginButton() {
    const [ user, setUser ] = useState<any>([]);
    const [ profile, setProfile ] = useState<Profile | null>(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'GoogleLoginButtonlication/json'
                        }
                    })
                    .then((res: any) => {
                        setProfile(res.data);
                    })
                    .catch((err: any) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            {profile ? (
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
            )}
        </div>
    );
}
export default GoogleLoginButton;