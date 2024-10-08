export namespace ImageUploadConstants {
  export const allowedImageTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  export const maxImageSizeMb = 5;

  export const uploadSectionInitialStyles = { transform: 'rotateY(-180deg)' };
  const animationEasing = 'cubic-bezier(0.13, 1.05, 0.44, 0.96)';

  export const uploadSectionEnterEasing = `0.4s ${animationEasing}`;
  export const uploadSectionToEnteringStyles = { transform: 'rotateY(0deg)' };

  export const uploadSectionLeaveEasing = `0.4s ${animationEasing}`;
}
