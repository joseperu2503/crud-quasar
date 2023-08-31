
import { imagesApi } from '@/api/imagesApi';
import { UploadImageResponse, UploadImagesResponse } from '@/interfaces/image.interface';

export function useUploadImage() {
  let folderName = process.env.IMAGES_FOLDER_NAME ?? 'crud_vuetify'

  const uploadImage = async (image: File): Promise<UploadImageResponse> => {
    try {
      let formData = new FormData();
      formData.append("image", image);
      formData.append("folder_name", folderName);
      let response = await imagesApi.post<UploadImageResponse>(`/upload_image`, formData)
      return response.data;
    } catch (error) {
      throw new Error("An error occurred while uploading the image.");
    }
  }

  const uploadImages = async (images: File[]): Promise<UploadImagesResponse> => {
    try {
      let formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append("images[]", images[i]);
      }
      formData.append("folder_name", folderName);
      let response = await imagesApi.post<UploadImagesResponse>(`/upload_images`, formData)
      return response.data;
    } catch (error) {
      throw new Error("An error occurred while uploading the images.");
    }
  }

  return {
    uploadImage,
    uploadImages
  }
}
