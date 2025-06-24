'use client';

import {useRouter} from 'next/navigation';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {patchReview} from '../apis/api-service';
import {ReviewPayload} from './type';
import toast from '@/shared/lib/utils/toastService';

type MutationVariables = {
  data: ReviewPayload;
  reviewId: number;
};

export default function usePatchReview() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({data, reviewId}: MutationVariables) => patchReview(data, reviewId),
    onSuccess: (_data, {category}) => {
      toast.success({
        title: '리뷰를 성공적으로 수정했어요.',
      });

      // TODO: reviewQueryKeys => reviewsQueryKeys로 변경 후 주석 해제
      // queryClient.invalidateQueries(reviewQueryKeys.search(category, 'recent'));
      // queryClient.invalidateQueries(reviewQueryKeys.search('all', 'recent'));

      router.push('/search');
    },
  });

  return {
    patchReview: mutate,
    ...rest,
  };
}
