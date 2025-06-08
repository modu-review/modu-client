import {useRouter, useSearchParams} from 'next/navigation';
import {isReviewCategory} from './isReviewCategory';
import {Category} from '@/entities/review';

export function useSelectCategoryFromUrl() {
  const route = useRouter();
  const searchParams = useSearchParams();

  const rawCategory = searchParams.get('categoryId');
  const selectedCategory = isReviewCategory(rawCategory) ? rawCategory : 'all';

  const handleSelectCategory = (category: Category) => {
    route.push(`?categoryId=${category}`);
  };

  return {selectedCategory, handleSelectCategory};
}
