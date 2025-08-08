import { API_CONFIG } from '@/config/api';

export interface CompanyFormationData {
  // Step 1: Basic Info
  businessType?: string;
  companyName?: string;
  
  // Step 2: User Info
  userInfo?: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
  };
  
  // Step 3: Business Details
  businessDetails?: {
    industryType: string;
    llcType?: string;
    stateName: string;
    number_of_ownership: number;
    multi_member_info: Array<{
      name: string;
      email: string;
      phone: string;
      ownership_percentage: number;
      street_address: string;
      city: string;
      state: string;
      zip_code: string;
      country: string;
    }>;
  };
  
  // Step 4: Plan Selection
  plan?: {
    plan_name: string;
    plan_price: number;
    free_plan_details?: {
      street_address: string;
      step4_city: string;
      step4_state: string;
      step4_zip_code: string;
      step4_country: string;
    };
  };
  
  // Step 5: Registered Agent
  agentInfo?: string;
  agentInfoTwo?: string;
  agent_information?: {
    ind_first_name?: string;
    ind_last_name?: string;
    ind_street_address?: string;
    ind_address_cont?: string;
    ind_city?: string;
    ind_state?: string;
    ind_country?: string;
    ind_zip_code?: string;
    com_company_name?: string;
    com_street_address?: string;
    com_address_cont?: string;
    com_city?: string;
    com_state?: string;
    com_country?: string;
    com_zip_code?: string;
  };
  
  // Step 6: EIN
  en_amount?: number;
  
  // Step 7: Operating Agreement
  agreement_amount?: number;
  
  // Step 8: Rush Processing
  rush_processing_amount?: number;
  
  // Payment
  payment?: {
    method: 'paypal' | 'stripe';
    amount: number;
    status: 'pending' | 'completed' | 'failed';
  };
  
  // Current step
  currentStep: number;
  
  // Legacy properties for backward compatibility
  isPaymentComplete?: boolean;
  registrationConfrim?: boolean;
  isOwnersInfoComplete?: boolean;
  
  // Metadata
  createdAt?: string;
  updatedAt?: string;
}

class CompanyFormationService {
  private readonly STORAGE_KEY = 'company_formation_data';
  
  // Save data to localStorage
  saveToLocalStorage(data: Partial<CompanyFormationData>): void {
    try {
      const existingData = this.getFromLocalStorage();
      const updatedData = {
        ...existingData,
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
  
  // Get data from localStorage
  getFromLocalStorage(): CompanyFormationData {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : { currentStep: 1 };
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return { currentStep: 1 };
    }
  }
  
  // Clear localStorage
  clearLocalStorage(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
  
    // Update specific step data
  updateStepData(step: number, data: Partial<CompanyFormationData>): void {
    const currentData = this.getFromLocalStorage();
    const stepKey = this.getStepKey(step);

    if (stepKey) {
      (currentData as any)[stepKey] = data;
      currentData.currentStep = step;
      this.saveToLocalStorage(currentData);
    }
  }
  
  // Get step key based on step number
  private getStepKey(step: number): keyof CompanyFormationData | null {
    const stepKeys: { [key: number]: keyof CompanyFormationData } = {
      1: 'companyName',
      2: 'userInfo',
      3: 'businessDetails',
      4: 'plan',
      5: 'agentInfo',
      6: 'en_amount',
      7: 'agreement_amount',
      8: 'rush_processing_amount'
    };
    
    return stepKeys[step] || null;
  }
  
  // Validate step data
  validateStep(step: number): { isValid: boolean; errors: string[] } {
    const data = this.getFromLocalStorage();
    const errors: string[] = [];
    
    switch (step) {
      case 1:
        if (!data.companyName?.trim()) {
          errors.push('Company name is required');
        }
        if (!data.businessType) {
          errors.push('Business type is required');
        }
        break;
        
      case 2:
        if (!data.userInfo?.first_name?.trim()) {
          errors.push('First name is required');
        }
        if (!data.userInfo?.last_name?.trim()) {
          errors.push('Last name is required');
        }
        if (!data.userInfo?.email?.trim()) {
          errors.push('Email is required');
        }
        if (!data.userInfo?.phone_number?.trim()) {
          errors.push('Phone number is required');
        }
        break;
        
      case 3:
        if (!data.businessDetails?.stateName) {
          errors.push('State is required');
        }
        if (!data.businessDetails?.industryType) {
          errors.push('Industry type is required');
        }
        break;
        
      case 4:
        if (!data.plan?.plan_name) {
          errors.push('Plan selection is required');
        }
        break;
        
      // Add more validations as needed
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  // Submit data to API
  async submitToAPI(): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const data = this.getFromLocalStorage();
      
      // Validate that all required data is present
      const validationResult = this.validateAllRequiredData(data);
      if (!validationResult.isValid) {
        return { success: false, error: `Missing required data: ${validationResult.errors.join(', ')}` };
      }
      
      // Debug: Log the data being sent
      console.log('Submitting company formation data:', data);
      
      const response = await fetch(`${API_CONFIG.BASE_URL}/company-formation/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          localStorageData: data
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Don't clear localStorage yet - keep data for payment process
        return { success: true, data: result };
      } else {
        return { success: false, error: result.error || 'Submission failed' };
      }
    } catch (error) {
      console.error('Error submitting to API:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Validate all required data for API submission
  private validateAllRequiredData(data: CompanyFormationData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check basic info
    if (!data.businessType) errors.push('Business type');
    if (!data.companyName) errors.push('Company name');

    // Check user info
    if (!data.userInfo?.first_name) errors.push('First name');
    if (!data.userInfo?.last_name) errors.push('Last name');
    if (!data.userInfo?.email) errors.push('Email');
    if (!data.userInfo?.phone_number) errors.push('Phone number');

    // Check business details
    if (!data.businessDetails?.stateName) errors.push('State');
    if (!data.businessDetails?.industryType) errors.push('Industry type');

    // Check plan
    if (!data.plan?.plan_name) errors.push('Plan selection');
    if (!data.plan?.plan_price) errors.push('Plan price');

    // Debug: Log the data structure
    console.log('Validation - Current data structure:', {
      businessType: data.businessType,
      companyName: data.companyName,
      userInfo: data.userInfo,
      businessDetails: data.businessDetails,
      plan: data.plan,
      currentStep: data.currentStep
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  // Create PayPal payment
  async createPayPalPayment(amount: number): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/paypal/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`
        },
        body: JSON.stringify({ amount })
      });
      
      const result = await response.json();
      
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error || 'Payment creation failed' };
      }
    } catch (error) {
      console.error('Error creating PayPal payment:', error);
      return { success: false, error: 'Network error' };
    }
  }
  
  // Capture PayPal payment
  async capturePayPalPayment(orderId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/paypal/capture-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`
        },
        body: JSON.stringify({ orderId })
      });
      
      const result = await response.json();
      
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error || 'Payment capture failed' };
      }
    } catch (error) {
      console.error('Error capturing PayPal payment:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Create Stripe payment intent
  async createStripePaymentIntent(amount: number, currency: string = 'usd'): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/stripe/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount,
          currency,
          metadata: {
            formation_type: 'company_formation',
            user_id: localStorage.getItem('user_id') || ''
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error || 'Payment intent creation failed' };
      }
    } catch (error) {
      console.error('Error creating Stripe payment intent:', error);
      return { success: false, error: 'Network error' };
    }
  }

  // Confirm Stripe payment
  async confirmStripePayment(paymentIntentId: string, paymentMethodId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/stripe/confirm-payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          payment_intent_id: paymentIntentId,
          payment_method_id: paymentMethodId
        })
      });

      const result = await response.json();

      if (result.success) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error || 'Payment confirmation failed' };
      }
    } catch (error) {
      console.error('Error confirming Stripe payment:', error);
      return { success: false, error: 'Network error' };
    }
  }
}

export const companyFormationService = new CompanyFormationService();
export default companyFormationService; 