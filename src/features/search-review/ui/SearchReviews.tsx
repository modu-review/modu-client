'use client';

import {CategoryBar, useSelectCategory} from '@/features/review-filtering';
import SearchBar from '@/features/search/ui/SearchBar';
import {Suspense} from 'react';
import ReviewsWithScroll from './ReviewWithScroll';

export default function SearchReviews() {
  const {selectedCategory, handleSelectCategory} = useSelectCategory();

  return (
    <section>
      <CategoryBar selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      <SearchBar />
      <Suspense fallback={<div>Loading</div>}>
        <ReviewsWithScroll selectedCategory={selectedCategory} />
      </Suspense>
    </section>
  );
}
