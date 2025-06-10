'use client';

import {useGetReviewBookmarks} from '@/entities/review';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  reviewId: number;
};

export default function Bookmarks({reviewId}: Props) {
  const {
    data: {bookmarks, hasBookmarked},
  } = useGetReviewBookmarks(reviewId);

  return (
    <button
      aria-label={`북마크 ${hasBookmarked ? '해제' : '추가'}하기`}
      aria-disabled={hasBookmarked}
      className={`flex items-center border border-gray-300 rounded-md py-2 px-5 mb-10 gap-0.5 ${hasBookmarked ? 'border-mediumBlue' : ' hover:bg-gray-100 transition-colors'}`}
    >
      {hasBookmarked ? (
        <LucideIcon name="BookmarkCheck" className="md:w-8 md:h-8 text-mediumBlue" />
      ) : (
        <LucideIcon name="Bookmark" className="md:w-8 md:h-8" />
      )}
      <p className={`md:text-lg font-semibold ${hasBookmarked && 'text-mediumBlue'}`}>{bookmarks}</p>
    </button>
  );
}
