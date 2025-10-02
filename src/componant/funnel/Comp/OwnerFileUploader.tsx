import React, { useState, useEffect } from 'react';
import ownerDocumentsService from '@/services/ownerDocumentsService';

interface OwnerFileUploaderProps {
  ownerId: number;
  ownerName: string;
  onUploadComplete?: () => void;
}

const OwnerFileUploader: React.FC<OwnerFileUploaderProps> = ({ 
  ownerId, 
  ownerName, 
  onUploadComplete 
}) => {
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [bankStatementFile, setBankStatementFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{
    scanned_passport_copy?: string;
    bank_statement?: string;
  }>({});
  const [message, setMessage] = useState<string>('');

  // Load existing documents when component mounts
  useEffect(() => {
    loadExistingDocuments();
  }, [ownerId]);

  const loadExistingDocuments = async () => {
    try {
      const response = await ownerDocumentsService.getDocuments(ownerId);
      if (response.status === 'success' && response.data) {
        setUploadedFiles(response.data.documents);
      }
    } catch (error) {
      console.error('Error loading existing documents:', error);
    }
  };

  const handlePassportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPassportFile(e.target.files[0]);
    }
  };

  const handleBankStatementFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBankStatementFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!passportFile && !bankStatementFile) {
      setMessage('Please select at least one file to upload.');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const files: { scanned_passport_copy?: File; bank_statement?: File } = {};
      
      if (passportFile) {
        files.scanned_passport_copy = passportFile;
      }
      
      if (bankStatementFile) {
        files.bank_statement = bankStatementFile;
      }

      const response = await ownerDocumentsService.uploadDocuments(ownerId, files);

      if (response.status === 'success') {
        setMessage('Files uploaded successfully!');
        setUploadedFiles(response.data?.uploaded_files || {});
        setPassportFile(null);
        setBankStatementFile(null);
        
        // Reset file inputs
        const passportInput = document.getElementById(`passport-${ownerId}`) as HTMLInputElement;
        const bankInput = document.getElementById(`bank-${ownerId}`) as HTMLInputElement;
        if (passportInput) passportInput.value = '';
        if (bankInput) bankInput.value = '';

        if (onUploadComplete) {
          onUploadComplete();
        }
      } else {
        setMessage(`Upload failed: ${response.message}`);
      }
    } catch (error) {
      setMessage('Upload failed. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-gray-50">
      <h4 className="font-semibold text-lg mb-3">{ownerName} - Document Upload</h4>
      
      <div className="space-y-4">
        {/* Passport Copy Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scanned Passport Copy
          </label>
          <input
            id={`passport-${ownerId}`}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handlePassportFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploadedFiles.scanned_passport_copy && (
            <p className="text-sm text-green-600 mt-1">
              ✓ Passport copy uploaded: {uploadedFiles.scanned_passport_copy.split('/').pop()}
            </p>
          )}
        </div>

        {/* Bank Statement Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Local Bank Statement (last 3 months)
          </label>
          <input
            id={`bank-${ownerId}`}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleBankStatementFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploadedFiles.bank_statement && (
            <p className="text-sm text-green-600 mt-1">
              ✓ Bank statement uploaded: {uploadedFiles.bank_statement.split('/').pop()}
            </p>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading || (!passportFile && !bankStatementFile)}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {uploading ? 'Uploading...' : 'Upload Files'}
        </button>

        {/* Message Display */}
        {message && (
          <p className={`text-sm mt-2 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default OwnerFileUploader;
