'use client';

import {useUserEmail} from '@/entities/auth';
import {useGetReviewBookmarks, useToggleBookmark} from '@/entities/review';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  reviewId: number;
  openLoginModal: () => void;
};

export default function Bookmarks({reviewId, openLoginModal}: Props) {
  const {
    data: {bookmarks, hasBookmarked},
  } = useGetReviewBookmarks(reviewId);

  const userEmail = useUserEmail();
  const {toggleBookmark, isPending} = useToggleBookmark();

  const handleClick = () => {
    if (!userEmail) {
      openLoginModal();
      return;
    }

    toggleBookmark({userEmail, reviewId});
  };

  return (
    <button
      aria-label={`북마크 ${hasBookmarked ? '해제' : '추가'}하기`}
      aria-disabled={isPending}
      onClick={handleClick}
      disabled={isPending}
      tabIndex={isPending ? -1 : 0}
      className={`flex items-center border border-gray-300 rounded-md py-3 px-5 mb-10 gap-0.5 hover:bg-gray-100 transition-colors ${hasBookmarked && 'border-mediumBlue'}`}
    >
      {hasBookmarked ? (
        <LucideIcon name="BookmarkCheck" className="w-7 h-7 md:w-8 md:h-8 text-mediumBlue" />
      ) : (
        <LucideIcon name="Bookmark" className="w-7 h-7 md:w-8 md:h-8" />
      )}
      <p className={`text-lg font-semibold ${hasBookmarked && 'text-mediumBlue'}`}>{bookmarks}</p>
    </button>
  );
}
