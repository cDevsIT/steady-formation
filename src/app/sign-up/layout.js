'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_CONFIG } from '@/config/api';

export default function SignUpLayout({ children }) {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
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