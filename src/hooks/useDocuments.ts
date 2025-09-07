import { useState, useEffect } from 'react';
import { documentsService, Document } from '@/lib/documentsService';

interface UseDocumentsReturn {
    documents: Document[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
    downloadDocument: (orderId: string, type: string, fileName: string) => Promise<void>;
}

export const useDocuments = (userId?: number): UseDocumentsReturn => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDocuments = async () => {
        if (!userId) {
            setDocuments([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await documentsService.getUserDocuments(userId);
            
            if (response.success && response.data) {
                setDocuments(response.data.documents);
            } else {
                setError(response.message || 'Failed to fetch documents');
                setDocuments([]);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch documents';
            setError(errorMessage);
            setDocuments([]);
        } finally {
            setIsLoading(false);
        }
    };

    const downloadDocument = async (orderId: string, type: string, fileName: string) => {
        try {
            await documentsService.triggerDownload(orderId, type, fileName);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to download document';
            setError(errorMessage);
            throw err;
        }
    };

    const refetch = () => {
        fetchDocuments();
    };

    useEffect(() => {
        fetchDocuments();
    }, [userId]);

    return {
        documents,
        isLoading,
        error,
        refetch,
        downloadDocument
    };
};
