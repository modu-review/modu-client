import {CATEGORY_LIST} from '../consts/category';

export type CategoryValue = (typeof CATEGORY_LIST)[number]['value'];

export type ReviewContent = {
  title: string;
  category: CategoryValue;
  author: string;
  created_at: string;
  content: string;
};

export type ReviewPayload = Omit<ReviewContent, 'created_at'>;
