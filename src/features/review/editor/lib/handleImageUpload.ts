import {getPresigned, uploadImage} from '@/entities/review';

async function handleImageUpload(
  file: File,
  onProgress: (event: {progress: number}) => void,
  abortSignal: AbortSignal,
) {
  const fileType = file.type.split('/')[1];
  const {presignedUrl, uuid: imageId} = await getPresigned(fileType);

  const url = await uploadImage({file, fileType, presignedUrl, imageId, onProgress, abortSignal});

  return url;
}

export default handleImageUpload;
