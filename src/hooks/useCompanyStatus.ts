import { useState, useEffect } from 'react';
import companyStatusService, { CompanyStatusData, UserOrder } from '@/lib/companyStatusService';

export interface UseCompanyStatusParams {
  order_id?: number;
  company_id?: number;
  user_id?: number;
}

export const useCompanyStatus = (params: UseCompanyStatusParams) => {
  const [statusData, setStatusData] = useState<CompanyStatusData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('useCompanyStatus - Fetching with params:', params);
        const response = await companyStatusService.getCompanyStatus(params);
        console.log('useCompanyStatus - Response received:', response);
        
        if (response.success) {
          setStatusData(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        console.error('useCompanyStatus - Error details:', err);
        console.error('useCompanyStatus - Error message:', err instanceof Error ? err.message : 'Unknown error');
        setError(err instanceof Error ? err.message : 'Failed to load company status');
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if we have at least one parameter
    if (params.order_id || params.company_id || params.user_id) {
      fetchStatus();
    } else {
      setIsLoading(false);
    }
  }, [params.order_id, params.company_id, params.user_id]);

  return { statusData, isLoading, error };
};

export const useUserOrders = (userId?: number) => {
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const response = await companyStatusService.getUserOrders(userId);
        
        if (response.success) {
          setOrders(response.data.orders);
        } else {
          setError(response.message);
        }
      } catch (err) {
        console.error('Error fetching user orders:', err);
        setError('Failed to load user orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return { orders, isLoading, error };
};
