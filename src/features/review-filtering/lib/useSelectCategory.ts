import {useState} from 'react';
import {BestReviewCategory} from '@/entities/reviews';

export function useSelectCategory(initialCategory: BestReviewCategory = 'all') {
  const [selectedCategory, setSelectedCategory] = useState<BestReviewCategory>(initialCategory);

  const handleSelectCategory = (category: BestReviewCategory) => {
    setSelectedCategory(category);
  };

  return {
    selectedCategory,
    handleSelectCategory,
  };
}
