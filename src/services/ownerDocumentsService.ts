import { API_CONFIG } from '@/config/api';

export interface OwnerDocumentUploadResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    owner_id: number;
    uploaded_files: {
      scanned_passport_copy?: string;
      bank_statement?: string;
    };
  };
}

export interface OwnerDocument {
  filename: string;
  url: string;
  path: string;
}

export interface OwnerDocumentsResponse {
  status: 'success' | 'error';
  data?: {
    owner_id: number;
    documents: {
      scanned_passport_copy?: OwnerDocument;
      bank_statement?: OwnerDocument;
    };
  };
}

export interface OwnerInfo {
  name: string;
  email: string;
  phone: string;
  ownership_percentage: number;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface StoreOwnersResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    company_id: number;
    owner_ids: number[];
    count: number;
  };
}

class OwnerDocumentsService {
  /**
   * Upload owner documents (passport copy and bank statement)
   */
  async uploadDocuments(
    ownerId: number,
    files: {
      scanned_passport_copy?: File;
      bank_statement?: File;
    }
  ): Promise<OwnerDocumentUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('owner_id', ownerId.toString());

      if (files.scanned_passport_copy) {
        formData.append('scanned_passport_copy', files.scanned_passport_copy);
      }

      if (files.bank_statement) {
        formData.append('bank_statement', files.bank_statement);
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}/owner-documents/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Upload failed');
      }

      return result;
    } catch (error) {
      console.error('Error uploading owner documents:', error);
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  }

  /**
   * Get owner documents
   */
  async getDocuments(ownerId: number): Promise<OwnerDocumentsResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/owner-documents/get?owner_id=${ownerId}`);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to get documents');
      }

      return result;
    } catch (error) {
      console.error('Error getting owner documents:', error);
      return {
        status: 'error',
        data: undefined
      };
    }
  }

  /**
   * Store/update owners for a company
   */
  async storeOwners(companyId: number, owners: OwnerInfo[]): Promise<StoreOwnersResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/owner-documents/store-owners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_id: companyId,
          owners: owners
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to store owners');
      }

      return result;
    } catch (error) {
      console.error('Error storing owners:', error);
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to store owners'
      };
    }
  }
}

export default new OwnerDocumentsService();
