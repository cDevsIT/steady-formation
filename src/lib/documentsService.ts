import { API_CONFIG, fetchApi } from '@/config/api';

export interface Document {
    id: number;
    name: string;
    icon: string;
    issuedDate: string;
    status: string;
    statusColor: string;
    action: string;
    file_path?: string;
}

export interface DocumentsResponse {
    success: boolean;
    message: string;
    data: {
        documents: Document[];
        total_count: number;
    } | null;
}

export const documentsService = {
    /**
     * Get user documents
     */
    async getUserDocuments(companyId: number): Promise<DocumentsResponse> {
        try {
            const response = await fetchApi<DocumentsResponse>(
                `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DOCUMENTS.USER_DOCUMENTS}?company_id=${companyId}`
            );
            return response;
        } catch (error) {
            console.error('Error fetching user documents:', error);
            throw error;
        }
    },

    /**
     * Download a document
     */
    async downloadDocument(orderId: string, type: string): Promise<Blob> {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DOCUMENTS.DOWNLOAD(orderId, type)}`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/pdf,application/octet-stream,*/*',
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Download failed: ${response.statusText}`);
            }

            return await response.blob();
        } catch (error) {
            console.error('Error downloading document:', error);
            throw error;
        }
    },

    /**
     * Trigger document download
     */
    async triggerDownload(orderId: string, type: string, fileName: string): Promise<void> {
        try {
            const blob = await this.downloadDocument(orderId, type);
            
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error triggering download:', error);
            throw error;
        }
    }
};
