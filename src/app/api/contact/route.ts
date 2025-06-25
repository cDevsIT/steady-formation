import { NextRequest, NextResponse } from 'next/server';
import { contactService, ContactFormData } from '@/services/contactService';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const formData: ContactFormData = body;

        // Validate the form data
        const validationErrors = contactService.validateContactData(formData);

        if (validationErrors.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Validation failed',
                    errors: validationErrors
                },
                { status: 400 }
            );
        }

        // Submit the contact form
        const response = await contactService.submitContactForm(formData);

        if (response.success) {
            // Send email notification to admin
            await contactService.sendEmailNotification(formData);

            return NextResponse.json(response, { status: 200 });
        } else {
            return NextResponse.json(
                {
                    success: false,
                    message: response.message || 'Failed to send message'
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Contact API error:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error. Please try again.'
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: 'Contact API endpoint' },
        { status: 200 }
    );
} 