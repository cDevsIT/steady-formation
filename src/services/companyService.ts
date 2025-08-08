import { fetchApi, API_CONFIG } from '@/config/api';

export interface CompanyData {
    company_name: string;
    entity_type: string;
    ein: string;
    business_address: string;
    registration_date: string;
    renewal_date: string;
    formation_state: string;
    status: string;
    headquarters: string;
    address_line_1: string;
    address_line_2: string;
    zip: string;
    address_status: string;
    last_mail_received_date: string;
    upgrade_premium_address: string;
}

export interface CompanyResponse {
    status: string;
    message: string;
    data: CompanyData;
}

export const getCompanyData = async (): Promise<CompanyData> => {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
        throw new Error('Authentication token not found');
    }

    const response = await fetchApi<CompanyResponse>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.COMPANY}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
    );
    return response.data;
}; 