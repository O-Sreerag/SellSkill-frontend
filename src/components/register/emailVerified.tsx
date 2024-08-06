import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { IoPlayForwardCircleSharp } from "react-icons/io5";
import LoadingSpinner from '../common/loadingSpinner';
import { VscError } from "react-icons/vsc";
import { FaRegCheckCircle } from "react-icons/fa";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export default function Component() {
    const query = useQuery();
    const [code, setCode] = useState<string>("");
    const [initialIcon, setInitialIcon] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [verificationFailed, setVerificationFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const code = query.get('code') ?? "";
        console.log("code :", code);
        // setCode(code);
        setCode(decodeURIComponent(code));
    }, [query]);

    const handleVerify = async () => {
        setIsLoading(true);
        setInitialIcon(false)
        try {
            const response = await fetch(`http://sellskill.zapto.org/auth/common/verify-user?code=${encodeURIComponent(code)}`);
            const data = await response.json();
            console.log(data)
            if (response.status === 200) {
                setIsVerified(true);
                setVerificationFailed(false);
            } else {
                setVerificationFailed(true);
            }
        } catch (error) {
            console.error("Verification failed:", error);
            setVerificationFailed(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full flex justify-center">
            <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col items-center pb-2">
                    <div className="bg-[#e0f7fa] px-4 py-5 rounded-t-lg text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            Email is Verified!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Your email srishti@eleve.co.in has been successfully verified.
                            You can now go back to the login page to access the platform
                        </p>
                    </div>
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white rounded-full p-2 shadow-lg">
                                {initialIcon ? (
                                    <IoPlayForwardCircleSharp className="text-[#3c96a2] h-8 w-8" />
                                ) : isLoading ? (
                                    <LoadingSpinner />
                                ) : isVerified ? (
                                    <FaRegCheckCircle className="text-[#3c96a2] h-8 w-8" />
                                ) : (
                                    <VscError className="text-red-500 h-8 w-8" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="pt-3 flex flex-col">
                        <div className="w-full flex justify-center">
                            {isVerified ? (
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded">
                                    <a href="/login">Go to the app</a>
                                </button>
                            ) : (
                                <button
                                    onClick={handleVerify}
                                    className="bg-[#38d338] hover:bg-[#43b143] text-white font-bold py-1 px-5 rounded"
                                >
                                    Verify Email
                                </button>
                            )}
                        </div>
                        {verificationFailed && (
                            <p className="text-sm text-red-500 mt-2">Verification failed. Please try again.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}