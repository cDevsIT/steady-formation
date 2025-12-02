'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_CONFIG } from '@/config/api';

export default function LoginLayout({ children }) {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            // Skip auth check if we have URL parameters (coming from admin customer view)
            if (typeof window !== 'undefined') {
                const urlSearchParams = new URLSearchParams(window.location.search);
                const hasUrlParams = urlSearchParams.get('email') && urlSearchParams.get('password');
                
                if (hasUrlParams) {
                    // Let the login page handle the auto-login
                    return;
                }
            }

            const token = localStorage.getItem('auth_token');
            
            if (token) {
                try {
                    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.USER}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const result = await response.json();
                        if (result.status === 'success') {
                            // User is already logged in, redirect to client dashboard
                            router.push('/client');
                            return;
                        }
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                }
            }
        };

        checkAuth();
    }, [router]);

    return <>{children}</>;
} 