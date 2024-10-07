import { ImageUploadConstants } from '@features/analysis/components/image-upload/image-upload.constants';
import { IAnalysisImage } from '@features/analysis/analysis.models';

export namespace ImageUploadFunctions {
  export const isImageTypeAllowed = (type: string): boolean => {
    return ImageUploadConstants.allowedImageTypes.includes(type);
  };

  export const extractDataTransferFile = (event: DragEvent): File | null => {
    const transfer = event.dataTransfer;
    if (transfer === null) return null;

    const transferFileList = transfer.files;
    const file = transferFileList[0];
    if (!file) return null;

    return file;
  };

  export const extractFileFromInput = (event: Event): File | null => {
    const fileInputElement = <HTMLInputElement>event.target;
    if (!fileInputElement.files) return null;

    const file = fileInputElement.files[0];
    if (!file) return null;

    return file;
  };

  export const readImage = (file: File): Promise<IAnalysisImage> =>
    new Promise((resolve, reject) => {
      {
        const reader = new FileReader();

        reader.onload = (readEvent: ProgressEvent<FileReader>) => {
          if (!readEvent.target) return;

          const image = readEvent.target.result;

          if (typeof image !== 'string') return reject('Image type is incorrect.');

          resolve({
            name: file.name,
            data: extractImageBase64Data(image),
            mediaType: extractImageType(image),
          });
        };

        reader.onerror = error => reject(error);

        reader.readAsDataURL(file);
      }
    });

  export const calculateImageSizeMb = (base64Image: string) => (base64Image.length * 6) / 8 / (1024 * 1024);

  // HELPERS
  const extractImageType = (imageData: string): string => imageData.split(':')[1].split(';')[0];

  const extractImageBase64Data = (imageData: string): string => imageData.split(',')[1];
}
