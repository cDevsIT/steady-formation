'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import companyFormationService from './companyFormationService';

export function useStartFunnelFunction() {
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
       // Clear any existing data and start fresh
        companyFormationService.clearLocalStorage();
       
        // Save initial data to localStorage
        companyFormationService.saveToLocalStorage(setupData);
       
        router.push('/setup-company');
    };
}