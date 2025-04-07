import {ReviewCategory} from '@/entities/reviews';
import CATEGORY_LIST from '../consts/categoryList';

export function IsReviewCategory(value: string | null): value is ReviewCategory {
  return value !== null && CATEGORY_LIST.some(({id}) => id === value);
}
