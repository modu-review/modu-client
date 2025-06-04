import {CATEGORY_LIST} from '../consts/category';

export type CategoryValue = (typeof CATEGORY_LIST)[number]['value'];

export type ReviewContent = {
  title: string;
  category: CategoryValue;
  author: string;
  created_at: string;
  content: string;
};

export type ReviewPayload = Omit<ReviewContent, 'created_at' | 'author'> & {
  authorEmail: string;
};

export type PresignedProps = {
  presignedUrl: string;
  uuid: string;
};

export type UploadImageProps = {
  file: File;
  fileType: string;
  presignedUrl: string;
  imageId: string;
  onProgress: (event: {progress: number}) => void;
  abortSignal: AbortSignal;
};
