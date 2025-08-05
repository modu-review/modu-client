'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {login} from '../apis/api-service';
import {authQueryKeys} from './query-service';
import {REDIRECT_STORAGE_KEY} from '../consts/authConstants';

export function useLogin() {
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: (email: string) => login(email),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKeys.session(),
      });

      const previousPath = sessionStorage.getItem(REDIRECT_STORAGE_KEY);
      sessionStorage.removeItem(REDIRECT_STORAGE_KEY);

      if (previousPath) {
        window.location.replace(previousPath);
      } else {
        window.location.replace('/');
      }
    },
  });

  return {
    login: mutate,
    ...rest,
  };
}
