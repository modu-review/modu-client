import {CATEGORY_LIST} from '../consts/category';

export type Category = (typeof CATEGORY_LIST)[number]['value'];

export type ReviewCard = {
  board_id: number;
  title: string;
  author_nickname: string;
  category: Category;
  preview: string;
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
  author_nickname: string;
  created_at: string;
  content: string;
  authorProfileUrl?: string;
  profile_image?: string;
};

export type Comment = {
  id: number;
  profile_image: string;
  author_nickname: string;
  content: string;
  created_at: string;
};

export type ReviewDetail = {
  board_id: number;
  title: string;
  category: Category;
  author_nickname: string;
  profile_image: string;
  created_at: string;
  content: string;
};

export type ReviewBookmarks = {
  bookmarks: number;
  hasBookmarked: boolean;
};

export type ReviewComments = {
  comments_count: number;
  comments: Comment[];
  current_page: number;
  total_pages: number;
};

export type ReviewPayload = {
  title: string;
  category: Category;
  content: string;
};

export type BookmarkPayload = {
  reviewId: number;
};

export type CommentPayload = {
  userNickname: string;
  category: Category;
  reviewId: number;
  content: string;
};

export type DeleteCommentPayload = {
  commentId: number;
  reviewId: number;
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
