import {getReviewDetail} from '@/entities/review';
import {Viewer} from '@/features/review/viewer';

type Props = {
  params: Promise<{reviewId: string}>;
};

export default async function ReviewDetailPage({params}: Props) {
  const {reviewId} = await params;

  const {author, content, bookmarks, category, created_at, title} = await getReviewDetail(Number(reviewId));
  return (
    <section className="flex flex-col w-full max-w-5xl mx-auto">
      <Viewer title={title} author={author} content={content} category={category} created_at={created_at} />
    </section>
  );
}
