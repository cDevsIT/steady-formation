import React, { useState, useEffect } from 'react';
import OwnerFileUploader from './OwnerFileUploader';
import { API_CONFIG } from '@/config/api';

interface OwnerInfo {
  id: number;
  name: string;
  email: string;
  company_id: number;
}

interface OwnerDocumentsUploadProps {
  companyId: number;
  onAllDocumentsUploaded?: () => void;
}

const OwnerDocumentsUpload: React.FC<OwnerDocumentsUploadProps> = ({ 
  companyId, 
  onAllDocumentsUploaded 
}) => {
  const [owners, setOwners] = useState<OwnerInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadedCount, setUploadedCount] = useState(0);

  useEffect(() => {
    fetchOwners();
  }, [companyId]);

  const fetchOwners = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/company/${companyId}/owners`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success' && data.data) {
          setOwners(data.data.owners || []);
        } else {
          throw new Error(data.message || 'Failed to fetch owners');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching owners:', error);
      // Show error message to user
      setOwners([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = () => {
    setUploadedCount(prev => prev + 1);
  };

  useEffect(() => {
    if (uploadedCount === owners.length && owners.length > 0 && onAllDocumentsUploaded) {
      onAllDocumentsUploaded();
    }
  }, [uploadedCount, owners.length, onAllDocumentsUploaded]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading owner information...</span>
      </div>
    );
  }

  if (owners.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No owners found for this company.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Upload Owner Documents</h2>
      <p className="text-gray-600 mb-6">
        Please upload the required documents for each owner. This includes a scanned passport copy 
        and a local bank statement from the last 3 months.
      </p>
      
      <div className="space-y-6">
        {owners.map((owner) => (
          <OwnerFileUploader
            key={owner.id}
            ownerId={owner.id}
            ownerName={owner.name}
            onUploadComplete={handleUploadComplete}
          />
        ))}
      </div>

      {uploadedCount > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            {uploadedCount} of {owners.length} owners have uploaded their documents.
          </p>
        </div>
      )}
    </div>
  );
};

export default OwnerDocumentsUpload;
