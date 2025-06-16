'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postReview} from '../apis/api-service';
import toast from '@/shared/lib/utils/toastService';
import {useRouter} from 'next/navigation';

export function usePostReview() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {mutate, ...rest} = useMutation({
    mutationFn: postReview,
    onSuccess: (_data, {category}) => {
      toast.success({
        title: '리뷰를 성공적으로 등록했어요.',
      });

      /**
       * Todo: 게시글 모음 페이지 로직 병합 후 주석 해제
       * 사용자가 등록한 카테고리의 캐시 무효화
       */
      //   queryClient.invalidateQueries(reviewQueryKeys.search(category, 'recent'));
      //   queryClient.invalidateQueries(reviewQueryKeys.search('all', 'recent'));

      router.push('/search');
    },
  });

  return {
    postReview: mutate,
    ...rest,
  };
}
