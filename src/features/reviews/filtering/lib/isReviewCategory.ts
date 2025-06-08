import {Category, CATEGORY_LIST} from '@/entities/review';

export function isReviewCategory(category: string | null): category is Category {
  return category !== null && CATEGORY_LIST.some(({value}) => value === category);
}
