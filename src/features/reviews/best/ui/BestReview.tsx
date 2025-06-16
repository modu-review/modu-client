'use client';

import Link from 'next/link';
import ReviewList from './ReviewList';
import {CategoryBar, useSelectCategory} from '@/features/reviews/filtering';
import {BestReviewsResult} from '@/entities/reviews';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  reviews: BestReviewsResult;
};

export default function BestReview({reviews}: Props) {
  const {selectedCategory, handleSelectCategory} = useSelectCategory();
  const filteredReview = reviews[selectedCategory];

  return (
    <section className=" flex flex-col items-center justify-center bg-boldBlue mt-16 py-12 md:px-8">
      <h4 className="text-white font-bold text-2xl mb-8 md:text-3xl">🔥 BEST 후기 🔥</h4>
      <CategoryBar selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      <ReviewList filteredReview={filteredReview} />
      <Link
        href="/search"
        className="flex items-center animate-bounce cursor-pointer text-white font-bold text-[20px]"
        aria-label="더 많은 후기 보러가기"
      >
        더 많은 후기 보기 <LucideIcon name="ArrowRight" size={20} />
      </Link>
    </section>
  );
}
