import { useState, useEffect } from 'react';

export interface VisitorCountry {
    countryCode: string;
    isLoading: boolean;
    error: string | null;
}

/**
 * Hook to detect visitor's country based on their location
 * Uses a free geolocation API to determine the country
 */
export function useVisitorCountry(): VisitorCountry {
    const [countryCode, setCountryCode] = useState<string>(() => {
        // Try to get from localStorage, but default to US
        return localStorage.getItem('visitorCountryCode') || 'US';
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if we cached it in the last 24 hours
        const lastFetch = localStorage.getItem('visitorCountryCodeTimestamp');
        const now = Date.now();
        const oneDayInMs = 24 * 60 * 60 * 1000;
        
        if (lastFetch && (now - parseInt(lastFetch)) < oneDayInMs) {
            const storedCountryCode = localStorage.getItem('visitorCountryCode');
            if (storedCountryCode) {
                setCountryCode(storedCountryCode);
                setIsLoading(false);
                return;
            }
        }

        // Fetch country from geolocation API
        const detectCountry = async () => {
            try {
                // Try multiple APIs in case one fails
                let detectedCountryCode = 'US';
                
                try {
                    // Method 1: Using ipapi.co (free, no key required, HTTPS)
                    const response1 = await fetch('https://ipapi.co/country_code/');
                    if (response1.ok) {
                        const countryCode1 = await response1.text();
                        if (countryCode1 && countryCode1.length === 2) {
                            detectedCountryCode = countryCode1.trim();
                        }
                    }
                } catch (error1) {
                    // Method 2: Using ipapi.co JSON endpoint as backup
                    try {
                        const response2 = await fetch('https://ipapi.co/json/');
                        if (response2.ok) {
                            const data2 = await response2.json();
                            if (data2.country_code) {
                                detectedCountryCode = data2.country_code;
                            }
                        }
                    } catch (error2) {
                        // Method 3: Using ipify + ipapi combination
                        try {
                            const response3 = await fetch('https://api.ipify.org?format=json');
                            if (response3.ok) {
                                const ipData = await response3.json();
                                const response4 = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
                                if (response4.ok) {
                                    const data4 = await response4.json();
                                    if (data4.country_code) {
                                        detectedCountryCode = data4.country_code;
                                    }
                                }
                            }
                        } catch (error3) {
                            // All APIs failed, will use default US
                        }
                    }
                }
                
                // Store in localStorage for future visits with timestamp
                localStorage.setItem('visitorCountryCode', detectedCountryCode);
                localStorage.setItem('visitorCountryCodeTimestamp', Date.now().toString());
                setCountryCode(detectedCountryCode);
                setError(null);
            } catch (err) {
                console.error('Error detecting visitor country:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
                // Keep default country code (US) on error
            } finally {
                setIsLoading(false);
            }
        };

        detectCountry();
    }, []);

    return { countryCode, isLoading, error };
}

