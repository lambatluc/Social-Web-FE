import { useState } from "react";
import axios from "axios";
import {
  CloudinaryError,
  UploadProgress,
  UseCloudinaryUploadReturn,
} from "@/types";

export const useCloudinaryUpload = (): UseCloudinaryUploadReturn => {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(
    null
  );
  const [error, setError] = useState<CloudinaryError | null>(null);

  const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!cloudinaryUrl) {
      const errorMsg =
        "Cloudinary URL is not configured in environment variables";
      console.error(errorMsg);
      setError({ message: errorMsg });
      return null;
    }
    setError(null);
    setIsUploading(true);
    setUploadProgress({ loaded: 0, total: 0, percentage: 0 });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await axios.post(cloudinaryUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 0;
          const loaded = progressEvent.loaded || 0;
          const percentage = total > 0 ? Math.round((loaded * 100) / total) : 0;

          setUploadProgress({
            loaded,
            total,
            percentage,
          });
        },
      });

      const imageUrl = response.data.secure_url;

      setUploadedUrl(imageUrl);
      setIsUploading(false);
      setUploadProgress(null);

      return imageUrl;
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error?.message || err?.message || "Upload failed";
      console.error("❌ Upload failed:", errorMessage);

      setError({
        message: errorMessage,
        error: err,
      });
      setIsUploading(false);
      setUploadProgress(null);

      return null;
    }
  };

  const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
    if (!files || files.length === 0) {
      return [];
    }

    setIsUploading(true);
    setError(null);

    try {
      const uploadPromises = files.map((file) => uploadSingleImage(file));
      const results = await Promise.all(uploadPromises);

      const successfulUrls = results.filter(
        (url): url is string => url !== null
      );

      setUploadedUrls(successfulUrls);
      setIsUploading(false);

      return successfulUrls;
    } catch (err: any) {
      const errorMessage = err?.message || "Multiple upload failed";
      console.error("❌ Multiple upload failed:", errorMessage);

      setError({
        message: errorMessage,
        error: err,
      });
      setIsUploading(false);

      return [];
    }
  };

  const uploadSingleImage = async (file: File): Promise<string | null> => {
    if (!cloudinaryUrl) {
      return null;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await axios.post(cloudinaryUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.secure_url;
    } catch (err) {
      console.error("❌ Single image upload failed:", err);
      return null;
    }
  };
  const resetUpload = () => {
    setUploadedUrl(null);
    setUploadedUrls([]);
    setIsUploading(false);
    setUploadProgress(null);
    setError(null);
  };

  return {
    uploadImage,
    uploadMultipleImages,
    uploadedUrl,
    uploadedUrls,
    isUploading,
    uploadProgress,
    error,
    resetUpload,
  };
};
