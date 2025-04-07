import {useState} from 'react';
import {ReviewCategory} from '@/entities/reviews';

export function useSelectCategory(initialCategory: ReviewCategory = 'all') {
  const [selectedCategory, setSelectedCategory] = useState<ReviewCategory>(initialCategory);

  const handleSelectCategory = (category: ReviewCategory) => {
    setSelectedCategory(category);
  };

  return {
    selectedCategory,
    handleSelectCategory,
  };
}
