import {CATEGORY_LIST} from '../consts/category';

export type Category = (typeof CATEGORY_LIST)[number]['value'];

export type ReviewCard = {
  board_id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  comments_count: number;
  bookmarks: number;
  image_url: string;
};

export type SearchReviewCard = ReviewCard & {
  created_at: string;
};

export type ReviewContent = {
  title: string;
  category: Category;
  author: string;
  created_at: string;
  content: string;
};

export type ReviewPayload = {
  title: string;
  category: Category;
  authorEmail: string;
  content: string;
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
