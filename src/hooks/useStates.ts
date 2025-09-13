import { useState, useEffect } from 'react';
import stateFeesService from '@/lib/stateFeesService';

export interface StateOption {
  label: string;
  value: string;
}

export const useStates = () => {
  const [states, setStates] = useState<StateOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const stateNames = await stateFeesService.getAvailableStates();
        
        // Convert state names to options format
        const stateOptions: StateOption[] = stateNames.map(stateName => ({
          label: stateName,
          value: stateName
        }));
        
        setStates(stateOptions);
      } catch (err) {
        console.error('Error fetching states:', err);
        setError('Failed to load states');
        
        // Fallback to some common states if API fails
        const fallbackStates: StateOption[] = [
          { label: 'California', value: 'California' },
          { label: 'New York', value: 'New York' },
          { label: 'Texas', value: 'Texas' },
          { label: 'Florida', value: 'Florida' },
          { label: 'Colorado', value: 'Colorado' },
          { label: 'Wyoming', value: 'Wyoming' },
        ];
        setStates(fallbackStates);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStates();
  }, []);

  return { states, isLoading, error };
};
