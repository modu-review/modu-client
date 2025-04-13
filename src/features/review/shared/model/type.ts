import {CATEGORY_LIST} from '../consts/categoryList';

export type CategoryValue = (typeof CATEGORY_LIST)[number]['value'];

export type ReviewContent = {
  title: string;
  category: CategoryValue;
  author: string;
  created_at: string;
  content: string;
};
