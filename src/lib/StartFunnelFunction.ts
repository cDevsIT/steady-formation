'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export function useCustomNavigation() {
    const router = useRouter();

    return (e: React.FormEvent, businessType: string, companyName: string) => {
        e.preventDefault();
        console.log(companyName, businessType)
        router.push('/setup-company')
        // Custom algorithm
        // if (input === 'dashboard') {
        //     router.push('/dashboard');
        // } else if (input === 'about') {
        //     router.push('/about');
        // } else {
        //     router.push('/');
        // }
    };
}