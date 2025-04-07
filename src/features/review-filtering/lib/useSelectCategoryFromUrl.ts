import {useRouter, useSearchParams} from 'next/navigation';
import {IsReviewCategory} from './isReviewCategory';
import {ReviewCategory} from '@/entities/reviews';

export function useSelectCategoryFromUrl() {
  const route = useRouter();
  const searchParams = useSearchParams();

  const rawCategory = searchParams.get('categoryId');
  const selectedCategory = IsReviewCategory(rawCategory) ? rawCategory : 'all';

  const handleSelectCategory = (category: ReviewCategory) => {
    route.push(`?categoryId=${category}`);
  };

  return {selectedCategory, handleSelectCategory};
}
