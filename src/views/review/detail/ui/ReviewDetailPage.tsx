import {getReviewDetail} from '@/entities/review';

type Props = {
  params: Promise<{reviewId: number}>;
};

export default async function ReviewDetailPage({params}: Props) {
  const {reviewId} = await params;

  const {author, content, bookmarks, category, created_at, title} = await getReviewDetail(reviewId);
  return (
    <section>
      <h2>
        {reviewId} {title} 상세보기
      </h2>
      <p>작성자: {author}</p>
      <p>카테고리: {category}</p>
      <p>작성일: {new Date(created_at).toLocaleDateString()}</p>
      <p>북마크 수: {bookmarks}</p>
      <p>내용: {content}</p>
    </section>
  );
}
