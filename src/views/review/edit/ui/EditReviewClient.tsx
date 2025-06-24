'use client';

import {ReviewDetail, ReviewPayload, usePatchReview} from '@/entities/review';
import {Editor} from '@/features/review/editor';

type Props = {
  data: ReviewDetail;
  reviewId: number;
};

export default function EditReviewClient({data, reviewId}: Props) {
  const {patchReview, isPending} = usePatchReview();

  const handlePatchReview = (data: ReviewPayload) => {
    patchReview({data, reviewId});
  };

  return (
    <Editor
      title={data.title}
      category={data.category}
      content={data.content}
      onSave={handlePatchReview}
      isPending={isPending}
    />
  );
}
