export const getImageWithoutExtension = (fileName: string): string => {
  return fileName.substring(0, fileName.lastIndexOf('.'));
};

export const getImageType = (fileName: string): string => {
  if (
    fileName.toLowerCase().endsWith('jpg') ||
    fileName.toLowerCase().endsWith('jpeg')
  ) {
    return 'image/jpeg';
  }
  return `image/${fileName
    .substring(fileName.lastIndexOf('.') + 1)
    .toLowerCase()}`;
};

export const getImageExtension = (fileName: string): string => {
  return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
};
