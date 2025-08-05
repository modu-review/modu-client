import {useQuery} from '@tanstack/react-query';
import {authQueryOptions} from './query-service';

export function useGetSession() {
  const {data: session, isSuccess} = useQuery({
    ...authQueryOptions.session,
  });

  return {session, isSuccess};
}
