import { fetchApi, API_CONFIG } from '@/config/api';

export interface QuickAction {
    id: number;
    name: string;
    due_date: string;
    status: string;
    status_class: string;
    action_label: string;
    action_enabled: boolean;
    action_type: string;
    action_url: string | null;
    file_path?: string | null;
    days_until_due?: number;
}

export interface QuickActionsResponse {
    success: boolean;
    message: string;
    data: {
        quick_actions: QuickAction[];
        total_actions: number;
        order_id: number;
        company_id: number;
        company_name: string | null;
    };
}

export const getQuickActions = async (userId?: number, companyId?: number): Promise<QuickAction[]> => {
    try {
        let url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.QUICK_ACTIONS.USER_ACTIONS}`;
        
        const params = new URLSearchParams();
        if (userId) params.append('user_id', userId.toString());
        if (companyId) params.append('company_id', companyId.toString());
        
        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const response = await fetchApi<QuickActionsResponse>(url);
        
        if (response.success && response.data) {
            return response.data.quick_actions;
        }
        
        return [];
    } catch (error) {
        console.error('Error fetching quick actions:', error);
        return [];
    }
};

