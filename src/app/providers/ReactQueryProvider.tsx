'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

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

        retry: 0,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
