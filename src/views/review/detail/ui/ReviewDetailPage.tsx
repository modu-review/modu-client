import {getReviewDetail} from '@/entities/review';
import {Bookmarks} from '@/features/review/bookmarks';
import {Viewer} from '@/features/review/viewer';
import {RQProvider} from '@/shared/providers';

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
      <RQProvider LoadingFallback={<div>loading...</div>}>
        <Bookmarks reviewId={parsedReviewId} />
      </RQProvider>
    </section>
  );
}
