import {Bookmarks, BookmarksLoading} from '@/features/review/bookmarks';
import {Comments, CommentsLoading} from '@/features/review/comments';
import {Category} from '@/entities/review';
import {RQProvider} from '@/shared/providers';

type Props = {
  reviewId: number;
  category: Category;
};

export default function ReviewDetailInteractive({reviewId, category}: Props) {
  return (
    <>
      <RQProvider LoadingFallback={<BookmarksLoading />}>
        <Bookmarks reviewId={reviewId} />
      </RQProvider>
      <RQProvider LoadingFallback={<CommentsLoading />}>
        <Comments reviewId={reviewId} category={category} />
      </RQProvider>
    </>
  );
}
