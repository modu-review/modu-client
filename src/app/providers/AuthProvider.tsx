'use client';

import {useEffect} from 'react';
import {useGetSession, useUpdateUser} from '@/entities/auth';

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({children}: Props) {
  const {session, isSuccess} = useGetSession();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (isSuccess && session) {
      updateUser({
        userId: session.userId,
        userEmail: session.userEmail,
        isLoggedIn: true,
      });
    } else {
      updateUser({
        userId: null,
        userEmail: null,
        isLoggedIn: false,
      });
    }
  }, [updateUser, session, isSuccess]);

  return children;
}
