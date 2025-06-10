import {useGetReviewBookmarks} from '@/entities/review';

type Props = {
  reviewId: number;
};

export default function Bookmarks({reviewId}: Props) {
  const {
    data: {bookmarks, hasBookmarked},
  } = useGetReviewBookmarks(reviewId);

  return <section></section>;
}
