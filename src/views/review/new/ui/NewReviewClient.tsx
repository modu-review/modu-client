'use client';

import {ReviewPayload, usePostReview} from '@/entities/review';
import {Editor} from '@/features/review/editor';

export default function NewReviewClient() {
  const {postReview, isPending} = usePostReview();

  const handleSaveReview = (data: ReviewPayload) => {
    postReview(data);
  };

  return <Editor isPending={isPending} onSave={handleSaveReview} />;
}
