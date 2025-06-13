import {Viewer} from '@/features/review/viewer';
import {Bookmarks, BookmarksLoading} from '@/features/review/bookmarks';
import {getReviewDetail} from '@/entities/review';
import {RQProvider} from '@/shared/providers';
import {Comments} from '@/features/review/comments';

type Props = {
  params: Promise<{reviewId: string}>;
};

export default async function ReviewDetailPage({params}: Props) {
  const {reviewId} = await params;
  const parsedReviewId = Number(reviewId);

  const {author, content, category, created_at, title} = await getReviewDetail(parsedReviewId);
  return (
    <section className="flex flex-col w-full max-w-5xl mx-auto items-center">
      <Viewer title={title} author={author} content={content} category={category} created_at={created_at} />
      <RQProvider LoadingFallback={<BookmarksLoading />}>
        <Bookmarks reviewId={parsedReviewId} />
      </RQProvider>
      <RQProvider LoadingFallback={<div>loading...</div>}>
        <Comments reviewId={parsedReviewId} category={category} />
      </RQProvider>
    </section>
  );
}
