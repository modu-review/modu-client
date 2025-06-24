import {getReviewDetail} from '@/entities/review';

type Props = {
  reviewId: number;
  sessionUserEmail: string;
};

export default async function EditReview({reviewId, sessionUserEmail}: Props) {
  const data = await getReviewDetail(reviewId);

  if (data.author !== sessionUserEmail) {
    throw new Error('작성자만 리뷰를 수정할 수 있습니다.');
  }

  return <>{/* TODO: EditReviewClient 컴포넌트 구현 후 onSave 콜백을 Editor 컴포넌트로 주입 */}</>;
}
