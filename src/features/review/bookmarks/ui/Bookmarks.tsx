'use client';

import {useGetReviewBookmarks} from '@/entities/review';

type Props = {
  reviewId: number;
};

export default function Bookmarks({reviewId}: Props) {
  const {
    data: {bookmarks, hasBookmarked},
  } = useGetReviewBookmarks(reviewId);

  return (
    <section>
      <p>{bookmarks}</p>
      <p>{hasBookmarked ? '북마크 O' : '북마크 X'}</p>
    </section>
  );
}
