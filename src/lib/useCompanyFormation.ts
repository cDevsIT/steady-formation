import { useState, useCallback } from 'react';
import companyFormationService, { CompanyFormationData } from './companyFormationService';

export const useCompanyFormation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Save data to localStorage
    const saveData = useCallback((data: Partial<CompanyFormationData>) => {
        try {
            companyFormationService.saveToLocalStorage(data);
            setError(null);
            return true;
        } catch (err) {
            setError('Failed to save data');
            return false;
        }
    }, []);

    // Get data from localStorage
    const getData = useCallback(() => {
        try {
            return companyFormationService.getFromLocalStorage();
        } catch (err) {
            setError('Failed to load data');
            return { currentStep: 1 };
        }
    }, []);

    // Validate current step
    const validateStep = useCallback((step: number) => {
        try {
            return companyFormationService.validateStep(step);
        } catch (err) {
            setError('Validation failed');
            return { isValid: false, errors: ['Validation failed'] };
        }
    }, []);

    // Submit data to API
    const submitToAPI = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await companyFormationService.submitToAPI();
            
            if (result.success) {
                return { success: true, data: result.data };
            } else {
                setError(result.error || 'Submission failed');
                return { success: false, error: result.error };
            }
        } catch (err) {
            setError('Network error');
            return { success: false, error: 'Network error' };
        } finally {
            setLoading(false);
        }
    }, []);

    // Create PayPal payment
    const createPayPalPayment = useCallback(async (amount: number) => {
        setLoading(true);
        setError(null);

        try {
            const result = await companyFormationService.createPayPalPayment(amount);
            
            if (result.success) {
                return { success: true, data: result.data };
            } else {
                setError(result.error || 'Payment creation failed');
                return { success: false, error: result.error };
            }
        } catch (err) {
            setError('Payment error');
            return { success: false, error: 'Payment error' };
        } finally {
            setLoading(false);
        }
    }, []);

    // Capture PayPal payment
    const capturePayPalPayment = useCallback(async (orderId: string) => {
        setLoading(true);
        setError(null);

        try {
            const result = await companyFormationService.capturePayPalPayment(orderId);
            
            if (result.success) {
                return { success: true, data: result.data };
            } else {
                setError(result.error || 'Payment capture failed');
                return { success: false, error: result.error };
            }
        } catch (err) {
            setError('Payment capture error');
            return { success: false, error: 'Payment capture error' };
        } finally {
            setLoading(false);
        }
    }, []);

    // Create Stripe payment intent
    const createStripePaymentIntent = useCallback(async (amount: number, currency: string = 'usd') => {
        setLoading(true);
        setError(null);

        try {
            const result = await companyFormationService.createStripePaymentIntent(amount, currency);
            
            if (result.success) {
                return { success: true, data: result.data };
            } else {
                setError(result.error || 'Payment intent creation failed');
                return { success: false, error: result.error };
            }
        } catch (err) {
            setError('Payment intent error');
            return { success: false, error: 'Payment intent error' };
        } finally {
            setLoading(false);
        }
    }, []);

    // Confirm Stripe payment
    const confirmStripePayment = useCallback(async (paymentIntentId: string, paymentMethodId: string) => {
        setLoading(true);
        setError(null);

        try {
            const result = await companyFormationService.confirmStripePayment(paymentIntentId, paymentMethodId);
            
            if (result.success) {
                return { success: true, data: result.data };
            } else {
                setError(result.error || 'Payment confirmation failed');
                return { success: false, error: result.error };
            }
        } catch (err) {
            setError('Payment confirmation error');
            return { success: false, error: 'Payment confirmation error' };
        } finally {
            setLoading(false);
        }
    }, []);

    // Clear data
    const clearData = useCallback(() => {
        try {
            companyFormationService.clearLocalStorage();
            setError(null);
        } catch (err) {
            setError('Failed to clear data');
        }
    }, []);

    // Update step data
    const updateStepData = useCallback((step: number, data: any) => {
        try {
            companyFormationService.updateStepData(step, data);
            setError(null);
            return true;
        } catch (err) {
            setError('Failed to update step data');
            return false;
        }
    }, []);

    return {
        loading,
        error,
        saveData,
        getData,
        validateStep,
        submitToAPI,
        createPayPalPayment,
        capturePayPalPayment,
        createStripePaymentIntent,
        confirmStripePayment,
        clearData,
        updateStepData
    };
}; 