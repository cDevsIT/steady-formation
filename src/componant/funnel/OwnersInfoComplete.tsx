import React, { useState } from "react";
import Image from "../ui/Image";
import { useRouter } from "next/navigation";
import companyFormationService from "@/lib/companyFormationService";
import { API_CONFIG } from "@/config/api";

const OwnersInfoComplete = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        
        try {
            // Get the temporary login token from localStorage
            const localData = companyFormationService.getFromLocalStorage();
            const tempLoginToken = localData?.tempLoginToken;
            
            if (!tempLoginToken) {
                console.error('No temporary login token found');
                router.push('/login');
                return;
            }

            // Validate the temporary token and get user credentials
            const response = await fetch(`${API_CONFIG.BASE_URL}/auth/validate-temp-token?temp_login_token=${tempLoginToken}`);
            const result = await response.json();

            if (result.status === 'success') {
                // Auto-login with the credentials
                const loginResponse = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: result.data.email,
                        password: result.data.temp_password,
                    }),
                });

                const loginResult = await loginResponse.json();

                if (loginResult.status === 'success') {
                    // Store the auth token
                    localStorage.setItem('auth_token', loginResult.data.token);
                    localStorage.setItem('user_info', JSON.stringify(loginResult.data.user));
                    
                    // Clear the company formation data
                    companyFormationService.clearLocalStorage();
                    
                    // Redirect to client dashboard
                    router.push('/client');
                } else {
                    console.error('Auto-login failed:', loginResult.message);
                    router.push('/login');
                }
            } else {
                console.error('Temporary token validation failed:', result.message);
                router.push('/login');
            }
        } catch (error) {
            console.error('Auto-login error:', error);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex justify-center items-start min-h-[70vh] mt-10 bg-white py-8 px-2">
            <div className="bg-gray-100 rounded-2xl max-w-[717px] w-full p-6 sm:p-10">
                {/* Confirmation Icon */}
                <div className="flex flex-col items-center gap-3 max-w-[525px] mx-auto">
                    <Image className="w-[76px]" url="/icons/confirm.svg" width={76} height={76} alt="Confirm" />
                    <h2 className="text-[24px] lg:text-[30px] font-semibold text-center mb-2">Owner information Submited!</h2>
                    <p className="text-[#6B7280] text-center mb-4 text-base font-normal">We will review your application 2 or 3 business days after complete, we&apos;re will inform you</p>
                    <button 
                        onClick={handleSubmit} 
                        disabled={loading}
                        className="bg-[#7856FC] hover:bg-[#6156fc] disabled:bg-gray-400 text-white font-medium rounded-md px-6 py-2 mb-6 transition"
                    >
                        {loading ? 'Logging in...' : 'Go To Dashboard'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OwnersInfoComplete;