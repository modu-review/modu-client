'use client';

import {useUserId} from '@/entities/auth';
import {useGetReviewBookmarks, useToggleBookmark} from '@/entities/review';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  reviewId: number;
};

export default function Bookmarks({reviewId}: Props) {
  const {
    data: {bookmarks, hasBookmarked},
  } = useGetReviewBookmarks(reviewId);

  const userId = useUserId();
  const {toggleBookmark} = useToggleBookmark();

  const handleClick = () => {
    // Todo: 로그인 유도를 위한 모달 띄우기
    if (!userId) return;

    toggleBookmark({userId, reviewId});
  };

  return (
    <button
      aria-label={`북마크 ${hasBookmarked ? '해제' : '추가'}하기`}
      aria-disabled={hasBookmarked}
      onClick={handleClick}
      className={`flex items-center border border-gray-300 rounded-md py-2 px-5 mb-10 gap-0.5 hover:bg-gray-100 transition-colors ${hasBookmarked && 'border-mediumBlue'}`}
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
