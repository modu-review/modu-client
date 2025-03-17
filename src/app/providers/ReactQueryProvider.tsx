'use client';

import {RequestGetError} from '@/shared/apis/request-error';
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

const ReactQueryProvider = ({children}: Props) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,

        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,

        retry: 3,

        // GET 요청이면서 errorHandlingType이 errorBoundary인 경우에만 에러를 던짐
        throwOnError: (error: Error) => error instanceof RequestGetError && error.errorHandlingType === 'errorBoundary',
      },
    },
    // Todo: onError 콜백 내부에서 Zustand의 전역 에러 스토어로 에러를 저장하는 로직을 추가해야 함
    queryCache: new QueryCache({
      onError(error) {},
    }),
    mutationCache: new MutationCache({
      onError(error) {},
    }),
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
