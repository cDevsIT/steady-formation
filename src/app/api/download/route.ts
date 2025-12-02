import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const filename = searchParams.get('filename');
    
    if (!filename) {
        return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    try {
        // Get the base URL without /api suffix
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' 
            ? 'https://app.steadyformation.com/api' 
            : 'http://localhost:8000/api');
        
        // Extract base URL by removing /api if present
        const baseUrl = apiUrl.replace(/\/api$/, '');
        
        // For image files, use direct storage URL
        const isImage = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(filename);
        
        let fileUrl;
        if (isImage) {
            // Use direct storage URL for images
            fileUrl = `${baseUrl}/storage/uploads/${filename}`;
        } else {
            // Use API endpoint for other files
            fileUrl = `${baseUrl}/api/documents/file/${filename}`;
        }
        
        const response = await fetch(fileUrl, {
            headers: {
                'Accept': 'application/octet-stream',
            },
        });

        if (!response.ok) {
            console.error(`Failed to fetch file from ${fileUrl}. Status: ${response.status}`);
            throw new Error(`Failed to fetch file: ${response.status}`);
        }

        const blob = await response.blob();
        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        
        return new NextResponse(blob, {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error('Download error:', error);
        return NextResponse.json({ error: 'Failed to download file', details: error }, { status: 500 });
    }
}
