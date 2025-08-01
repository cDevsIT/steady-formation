import { API_CONFIG, fetchApi } from '@/config/api';

export interface UserProfile {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone: string;
    country_of_residence: string;
    timezone: string;
    avatar?: string;
    role: string;
    active: boolean;
    created_at: string;
    updated_at: string;
}

export interface UserProfileResponse {
    status: string;
    data: UserProfile;
}

export interface UpdateProfileData {
    first_name: string;
    last_name: string;
    email?: string; // Made optional since email changes are not allowed
    phone?: string | null;
    country_of_residence?: string | null;
    timezone?: string | null;
    avatar?: string | null;
}

export interface UpdatePasswordData {
    current_password: string;
    new_password: string;
    confirm_password: string;
}

export const getUserProfile = async (): Promise<UserProfile> => {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
        throw new Error('Authentication token not found');
    }

    const response = await fetchApi<UserProfileResponse>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.PROFILE}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const updateUserProfile = async (data: UpdateProfileData): Promise<UserProfile> => {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
        throw new Error('Authentication token not found');
    }

    try {
        // Try sending as form data first, as Laravel often expects this for PUT requests
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value.toString());
            }
        });

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body: formData,
        };
        
        const response = await fetchApi<UserProfileResponse>(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.UPDATE_PROFILE}`,
            requestOptions
        );

        return response.data;
    } catch (error) {
        // Fallback to JSON if FormData fails
        try {
            const jsonRequestOptions = {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            };
            
            const response = await fetchApi<UserProfileResponse>(
                `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.UPDATE_PROFILE}`,
                jsonRequestOptions
            );

            return response.data;
        } catch (jsonError) {
            // Re-throw the original error with more context
            if (error instanceof Error) {
                throw new Error(`Profile update failed: ${error.message}`);
            }
            throw error;
        }
    }
};

export const updateUserPassword = async (data: UpdatePasswordData): Promise<{ status: string; message: string }> => {
    const token = localStorage.getItem('auth_token');
    
    console.log('Password service received data:', {
        current_password: data.current_password ? '***' : 'empty',
        new_password: data.new_password ? '***' : 'empty',
        confirm_password: data.confirm_password ? '***' : 'empty'
    });
    
    if (!token) {
        throw new Error('Authentication token not found');
    }

    try {
        // Try sending as JSON first, as some Laravel backends prefer this
        const jsonRequestOptions = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        };
        
        console.log('Sending JSON request');
        const response = await fetchApi<{ status: string; message: string }>(
            `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.UPDATE_PASSWORD}`,
            jsonRequestOptions
        );

        return response;
    } catch (error) {
        console.log('JSON failed, trying FormData');
        // Fallback to FormData if JSON fails
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    formData.append(key, value.toString());
                    console.log(`FormData: ${key} = ${key.includes('password') ? '***' : value}`);
                }
            });

            const formDataRequestOptions = {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: formData,
            };
            
            console.log('Sending FormData request');
            const response = await fetchApi<{ status: string; message: string }>(
                `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.UPDATE_PASSWORD}`,
                formDataRequestOptions
            );

            return response;
        } catch (formDataError) {
            // Re-throw the original error with more context
            if (error instanceof Error) {
                throw new Error(`Password update failed: ${error.message}`);
            }
            throw error;
        }
    }
}; 