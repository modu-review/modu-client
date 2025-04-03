'use client';

import {CategoryBar, useSelectCategory} from '@/features/review-filtering';
import SearchBar from '@/features/search/ui/SearchBar';

export default function SearchReviews() {
  const {selectedCategory, handleSelectCategory} = useSelectCategory();

  return (
    <section>
      <CategoryBar selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      <SearchBar />
    </section>
  );
}
