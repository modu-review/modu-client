'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {deleteReview} from '../apis/api-service';
import {Category} from './type';
import toast from '@/shared/lib/utils/toastService';

type MutationVariables = {
  category: Category;
  reviewId: number;
};

export default function useDeleteReview() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({category, reviewId}: MutationVariables) => deleteReview(reviewId),
    onSuccess: (_data, {category, reviewId}) => {
      toast.success({
        title: '리뷰를 성공적으로 삭제했어요.',
      });

      // TODO: reviewQueryKeys => reviewsQueryKeys로 변경 후 주석 해제
      // queryClient.invalidateQueries(reviewQueryKeys.search(category, 'recent'));
      // queryClient.invalidateQueries(reviewQueryKeys.search('all', 'recent'));

      router.push('/search');
    },
  });

  return {
    deleteReview: mutate,
    ...rest,
  };
}
