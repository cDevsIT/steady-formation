import { API_CONFIG } from '@/config/api';

export interface StateFee {
  state_name: string;
  fee: number;
}

export interface StateFeeResponse {
  success: boolean;
  message: string;
  data: {
    field_name: string;
    total_states: number;
    states: StateFee[];
  };
}

export interface AllStateFeesResponse {
  success: boolean;
  message: string;
  data: {
    total_states: number;
    states: Array<{
      state_name: string;
      fees: {
        registration_fee: number;
        renewal_fee: number;
        transfer_fee: number;
      };
    }>;
  };
}

export interface SingleStateFeeResponse {
  success: boolean;
  message: string;
  data: {
    state_name: string;
    fees: {
      registration_fee: number;
      renewal_fee: number;
      transfer_fee: number;
    };
  };
}

class StateFeesService {
  /**
   * Get state fees by field name (fees, renewal_fee, transfer_fee)
   */
  async getFeesByField(fieldName: 'fees' | 'renewal_fee' | 'transfer_fee'): Promise<StateFeeResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STATE_FEES.BY_FIELD}?field_name=${fieldName}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching state fees by field:', error);
      throw error;
    }
  }

  /**
   * Get all fee types for all states
   */
  async getAllFees(): Promise<AllStateFeesResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STATE_FEES.ALL}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all state fees:', error);
      throw error;
    }
  }

  /**
   * Get fees for a specific state
   */
  async getFeesByState(stateName: string): Promise<SingleStateFeeResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STATE_FEES.BY_STATE(stateName)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching state fees by state:', error);
      throw error;
    }
  }

  /**
   * Get registration fee for a specific state
   */
  async getRegistrationFee(stateName: string): Promise<number> {
    try {
      const response = await this.getFeesByState(stateName);
      return response.data.fees.registration_fee;
    } catch (error) {
      console.error('Error fetching registration fee:', error);
      return 0; // Return 0 as fallback
    }
  }

  /**
   * Get renewal fee for a specific state
   */
  async getRenewalFee(stateName: string): Promise<number> {
    try {
      const response = await this.getFeesByState(stateName);
      return response.data.fees.renewal_fee;
    } catch (error) {
      console.error('Error fetching renewal fee:', error);
      return 0; // Return 0 as fallback
    }
  }

  /**
   * Get transfer fee for a specific state
   */
  async getTransferFee(stateName: string): Promise<number> {
    try {
      const response = await this.getFeesByState(stateName);
      return response.data.fees.transfer_fee;
    } catch (error) {
      console.error('Error fetching transfer fee:', error);
      return 0; // Return 0 as fallback
    }
  }

  /**
   * Get all fees for a specific state
   */
  async getStateFees(stateName: string): Promise<{
    registration_fee: number;
    renewal_fee: number;
    transfer_fee: number;
  }> {
    try {
      const response = await this.getFeesByState(stateName);
      return response.data.fees;
    } catch (error) {
      console.error('Error fetching state fees:', error);
      return {
        registration_fee: 0,
        renewal_fee: 0,
        transfer_fee: 0
      };
    }
  }

  /**
   * Get list of all available states from the API
   */
  async getAvailableStates(): Promise<string[]> {
    try {
      const response = await this.getAllFees();
      return response.data.states.map(state => state.state_name);
    } catch (error) {
      console.error('Error fetching available states:', error);
      return []; // Return empty array if API fails
    }
  }
}

export const stateFeesService = new StateFeesService();
export default stateFeesService;
