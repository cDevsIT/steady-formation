'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export function useCustomNavigation() {
    const router = useRouter();

    return (e: React.FormEvent, businessType: string, companyName: string) => {
        e.preventDefault();
        if (!companyName.trim()) {
            return;
        }
        const setupData = {
            businessType,
            companyName,
            currentStep: 1,
        };
        // Save to localStorage
        localStorage.setItem('companyData', JSON.stringify(setupData));
        router.push('/setup-company')
    };
}