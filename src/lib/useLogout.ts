import { useRouter } from 'next/navigation';
import { API_CONFIG } from '@/config/api';

export const useLogout = () => {
    const router = useRouter();

    const handleLogout = async () => {
        const token = localStorage.getItem('auth_token');

        if (token) {
            try {
                await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGOUT}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            } catch (error) {
                console.error('Logout error:', error);
            }
        }

        localStorage.removeItem('auth_token');
        router.push('/login');
    };

    return { handleLogout };
}; 