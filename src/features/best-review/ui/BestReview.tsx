'use client';

import {CategoryBar} from '@/shared/ui/components';
import {useState} from 'react';
import ReviewCard from '@/shared/ui/components/ReviewCard';
import Link from 'next/link';
import {LucideIcon} from '@/shared/ui/icons';
import {useGetBestReviews} from '@/entities/reviews';
import {BestReviewCategory} from '@/entities/reviews/model/types';

export default function BestReview() {
  const reviews = useGetBestReviews();

  const [selectedCategory, setSelectedCategory] = useState<BestReviewCategory>('all');
  const {count, reviews: filteredReviews} = reviews[selectedCategory];

  const handleSelectCategory = (category: BestReviewCategory) => {
    setSelectedCategory(category);
  };

  return (
    <section className=" flex flex-col items-center justify-center bg-boldBlue mt-16 py-12 md:px-8">
      <h4 className="text-white font-bold text-2xl mb-8 md:text-3xl">🔥 BEST 후기 🔥</h4>
      <CategoryBar selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      {count === 0 ? (
        <section className="w-full h-full min-h-[250px] md:min-h-[350px] lg:min-h-[450px] mb-10 flex flex-col items-center justify-center">
          <LucideIcon className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]" name="PackageOpen" color="white" />
          <p className="text-white mt-8 text-lg md:text-xl">해당 카테고리는 아직 베스트 후기가 없어요.</p>
        </section>
      ) : (
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-14 md:gap-y-20 content-center justify-items-center mb-16">
          {filteredReviews.map(card => (
            <li key={card.board_id}>
              <ReviewCard card={card} from="bestReview" />
            </li>
          ))}
        </ul>
      )}
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
