import {useMutation, useQueryClient} from '@tanstack/react-query';
import {logout} from '../apis/api-service';
import {authQueryKeys} from './query-service';

export function useLogout() {
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.session(),
      });

      window.location.reload();
    },
  });

  return {
    logout: mutate,
    ...rest,
  };
}
