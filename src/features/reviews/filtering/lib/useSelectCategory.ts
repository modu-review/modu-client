import {useState} from 'react';
import {Category} from '@/entities/review';

export function useSelectCategory(initialCategory: Category = 'all') {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  return {
    selectedCategory,
    handleSelectCategory,
  };
}
