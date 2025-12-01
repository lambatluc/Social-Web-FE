export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface CloudinaryError {
  message: string;
  error?: any;
}

export interface UseCloudinaryUploadReturn {
  uploadImage: (file: File) => Promise<string | null>;
  uploadMultipleImages: (files: File[]) => Promise<string[]>;
  uploadedUrl: string | null;
  uploadedUrls: string[];
  isUploading: boolean;
  uploadProgress: UploadProgress | null;
  error: CloudinaryError | null;
  resetUpload: () => void;
}
