import { API_CONFIG, fetchApi } from '@/config/api';

export interface StatusStep {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'complete';
  order: number;
}

export interface CompanyStatusData {
  order_id: number;
  company_id: number;
  company_name: string | null;
  user_id: number;
  customer_name: string | null;
  progress: {
    percentage: number;
    completed_steps: number;
    total_steps: number;
  };
  current_step: StatusStep | null;
  next_step: StatusStep | null;
  steps: StatusStep[];
  overall_status: string;
  payment_status: string;
  compliance_status: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyStatusResponse {
  success: boolean;
  message: string;
  data: CompanyStatusData;
}

export interface UserOrder {
  order_id: number;
  company_id: number;
  company_name: string | null;
  progress_percentage: number;
  overall_status: string;
  payment_status: string;
  compliance_status: string;
  created_at: string;
  updated_at: string;
}

export interface UserOrdersResponse {
  success: boolean;
  message: string;
  data: {
    orders: UserOrder[];
    total_orders: number;
  };
}

class CompanyStatusService {
  /**
   * Get company status for a specific order/company
   */
  async getCompanyStatus(params: {
    order_id?: number;
    company_id?: number;
    user_id?: number;
  }): Promise<CompanyStatusResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.order_id) queryParams.append('order_id', params.order_id.toString());
      if (params.company_id) queryParams.append('company_id', params.company_id.toString());
      if (params.user_id) queryParams.append('user_id', params.user_id.toString());

      const endpoint = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMPANY_STATUS.STATUS}?${queryParams}`;
      console.log('Fetching company status from:', endpoint);
      
      const data = await fetchApi<CompanyStatusResponse>(endpoint);
      return data;
    } catch (error) {
      console.error('Error fetching company status:', error);
      throw error;
    }
  }

  /**
   * Get all orders for a user
   */
  async getUserOrders(userId: number): Promise<UserOrdersResponse> {
    try {
      const endpoint = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMPANY_STATUS.USER_ORDERS}?user_id=${userId}`;
      console.log('Fetching user orders from:', endpoint);
      
      const data = await fetchApi<UserOrdersResponse>(endpoint);
      return data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  }

  /**
   * Get status step by ID
   */
  getStatusStepById(steps: StatusStep[], stepId: string): StatusStep | null {
    return steps.find(step => step.id === stepId) || null;
  }

  /**
   * Get completed steps count
   */
  getCompletedStepsCount(steps: StatusStep[]): number {
    return steps.filter(step => step.status === 'complete').length;
  }

  /**
   * Get processing step
   */
  getProcessingStep(steps: StatusStep[]): StatusStep | null {
    return steps.find(step => step.status === 'processing') || null;
  }

  /**
   * Get next pending step
   */
  getNextPendingStep(steps: StatusStep[]): StatusStep | null {
    return steps.find(step => step.status === 'pending') || null;
  }

  /**
   * Calculate progress percentage
   */
  calculateProgressPercentage(steps: StatusStep[]): number {
    const completedSteps = this.getCompletedStepsCount(steps);
    const totalSteps = steps.length;
    return totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  }

  /**
   * Get step status for frontend display
   */
  getStepDisplayStatus(step: StatusStep, currentStepIndex: number): {
    isCompleted: boolean;
    isProcessing: boolean;
    isUpcoming: boolean;
  } {
    const isCompleted = step.status === 'complete';
    const isProcessing = step.status === 'processing';
    const isUpcoming = step.status === 'pending' && !isCompleted && !isProcessing;

    return {
      isCompleted,
      isProcessing,
      isUpcoming
    };
  }
}

export const companyStatusService = new CompanyStatusService();
export default companyStatusService;
