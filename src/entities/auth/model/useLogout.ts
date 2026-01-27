import {useMutation, useQueryClient} from '@tanstack/react-query';
import {logout} from '../apis/api-service';
import {authQueryKeys} from './query-service';
import {useUpdateUser} from './authStore';

export function useLogout() {
  const queryClient = useQueryClient();
  const updateUser = useUpdateUser();

  const {mutate, ...rest} = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.session(),
      });

      updateUser({
        isLoggedIn: false,
        userEmail: null,
        userNickname: null,
      });
    },
  });

  return {
    logout: mutate,
    ...rest,
  };
}
