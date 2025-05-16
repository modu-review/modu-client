import CATEGORY_LIST from '../consts/categoryList';
import {ReviewCategory} from '@/entities/reviews';

export function IsReviewCategory(value: string | null): value is ReviewCategory {
  return value !== null && CATEGORY_LIST.some(({id}) => id === value);
}
