'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { API_CONFIG } from '@/config/api';

export interface Company {
    id: number;
    company_name: string;
    business_type: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    name: string; // Alias for company_name for compatibility
    address: string; // Computed address
    icon: string; // Default icon
    // Address fields from company table
    plan_street_address?: string;
    plan_city?: string;
    plan_state?: string;
    plan_zip_code?: string;
    plan_zip_country?: string;
    order?: {
        id: number;
        state_name: string;
        compliance_status: string;
        ein_number?: string;
    };
}

interface CompanyContextType {
    companies: Company[];
    selectedCompany: Company | null;
    setSelectedCompany: (company: Company | null) => void;
    loading: boolean;
    error: string | null;
    refreshCompanies: () => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompany = () => {
    const context = useContext(CompanyContext);
    if (context === undefined) {
        throw new Error('useCompany must be used within a CompanyProvider');
    }
    return context;
};

interface CompanyProviderProps {
    children: ReactNode;
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({ children }) => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCompanies = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const token = localStorage.getItem('auth_token');
            if (!token) {
                throw new Error('Authentication token not found');
            }

            const response = await fetch(`${API_CONFIG.BASE_URL}/user/companies`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch companies');
            }

            const result = await response.json();
            
            if (result.status === 'success') {
                // Process companies to add required fields
                const processedCompanies = result.data.map((company: any) => ({
                    ...company,
                    name: company.company_name,
                    address: company.plan_street_address || 'N/A',
                    icon: `/client/dropdown-icon${(company.id % 4) + 1}.svg`, // Cycle through 4 icons
                }));
                
                setCompanies(processedCompanies);
                
                // If no company is selected, select the first one
                if (processedCompanies.length > 0) {
                    const savedCompanyId = localStorage.getItem('selected_company_id');
                    if (savedCompanyId) {
                        const savedCompany = processedCompanies.find(c => c.id.toString() === savedCompanyId);
                        if (savedCompany) {
                            setSelectedCompany(savedCompany);
                        } else {
                            setSelectedCompany(processedCompanies[0]);
                            localStorage.setItem('selected_company_id', processedCompanies[0].id.toString());
                        }
                    } else {
                        setSelectedCompany(processedCompanies[0]);
                        localStorage.setItem('selected_company_id', processedCompanies[0].id.toString());
                    }
                }
            } else {
                throw new Error(result.message || 'Failed to fetch companies');
            }
        } catch (err: any) {
            setError(err.message);
            console.error('Error fetching companies:', err);
        } finally {
            setLoading(false);
        }
    }, []); // Remove selectedCompany from dependencies to prevent infinite loop

    const refreshCompanies = () => {
        fetchCompanies();
    };

    // This logic is now handled in fetchCompanies to avoid multiple API calls

    // Fetch companies on mount
    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    // Save selected company to localStorage when it changes
    useEffect(() => {
        if (selectedCompany) {
            localStorage.setItem('selected_company_id', selectedCompany.id.toString());
        } else {
            localStorage.removeItem('selected_company_id');
        }
    }, [selectedCompany]);

    const value: CompanyContextType = {
        companies,
        selectedCompany,
        setSelectedCompany,
        loading,
        error,
        refreshCompanies,
    };

    return (
        <CompanyContext.Provider value={value}>
            {children}
        </CompanyContext.Provider>
    );
}; 