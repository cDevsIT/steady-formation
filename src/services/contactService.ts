import { fetchApi } from '@/config/api';

export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    countryCode?: string;
    subject: string;
    message: string;
    privacy: boolean;
}

export interface ContactResponse {
    success: boolean;
    message: string;
    id?: string;
    errors?: string[];
}

export const contactService = {
    // Submit contact form
    submitContactForm: async (data: ContactFormData): Promise<ContactResponse> => {
        try {
            return await fetchApi<ContactResponse>('/api/contact', {
                method: 'POST',
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.error('Contact service error:', error);
            throw new Error('Failed to send message. Please try again.');
        }
    },

    // Send email notification (for admin)
    sendEmailNotification: async (data: ContactFormData): Promise<void> => {
        try {
            // TODO: Implement email notification service
            console.log('Sending email notification:', data);
        } catch (error) {
            console.error('Email notification error:', error);
        }
    },

    // Validate contact form data
    validateContactData: (data: ContactFormData): string[] => {
        const errors: string[] = [];

        if (!data.firstName?.trim()) {
            errors.push('First name is required');
        }

        if (!data.lastName?.trim()) {
            errors.push('Last name is required');
        }

        if (!data.email?.trim()) {
            errors.push('Email is required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.push('Please enter a valid email address');
        }

        if (!data.subject?.trim()) {
            errors.push('Subject is required');
        }

        if (!data.message?.trim()) {
            errors.push('Message is required');
        } else if (data.message.length < 10) {
            errors.push('Message must be at least 10 characters');
        }

        if (!data.privacy) {
            errors.push('You must accept the privacy policy');
        }

        return errors;
    }
}; 