import {getSession} from '../apis/api-service';

export const authQueryKeys = {
  all: () => ['auth'] as const,
  session: () => [...authQueryKeys.all(), 'session'] as const,
};

export const authQueryOptions = {
  session: {
    queryKey: authQueryKeys.session(),
    queryFn: () => getSession(),
  },
};
