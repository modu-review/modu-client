'use client';

import {useEffect} from 'react';
import {getSession, useUpdateUser} from '@/entities/auth';
import {useUpdateGlobalError} from '@/entities/error';

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({children}: Props) {
  const updateUser = useUpdateUser();
  const updateError = useUpdateGlobalError();

  useEffect(() => {
    getSession()
      .then(res => {
        updateUser(res);
      })
      .catch(err => {
        updateError(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
