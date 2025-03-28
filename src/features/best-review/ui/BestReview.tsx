'use client';

import {useState} from 'react';
import Link from 'next/link';
import {ReviewList, BestReviewCategory, BestReviewMapped} from '@/entities/reviews';
import {CategoryBar} from '@/shared/ui/components';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  reviews: BestReviewMapped;
};

export default function BestReview({reviews}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<BestReviewCategory>('all');
  const filteredReview = reviews[selectedCategory];

  const handleSelectCategory = (category: BestReviewCategory) => {
    setSelectedCategory(category);
  };

  return (
    <section className=" flex flex-col items-center justify-center bg-boldBlue mt-16 py-12 md:px-8">
      <h4 className="text-white font-bold text-2xl mb-8 md:text-3xl">🔥 BEST 후기 🔥</h4>
      <CategoryBar selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      <ReviewList filteredReview={filteredReview} />
      <Link
        href="/allreviews"
        className="flex items-center animate-bounce cursor-pointer text-white font-bold text-[20px]"
        aria-label="더 많은 후기 보러가기"
      >
        더 많은 후기 보기 <LucideIcon name="ArrowRight" size={20} />
      </Link>
    </section>
  );
}
