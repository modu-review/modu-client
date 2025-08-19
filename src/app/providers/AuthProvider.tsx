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
    if (session && session.isLoggedIn && session.userNickname) {
      updateUser({
        userNickname: decodeURIComponent(session.userNickname),
        isLoggedIn: true,
      });
    } else {
      updateUser({
        userNickname: null,
        isLoggedIn: false,
      });
    }
  }, [updateUser, session, isSuccess]);

  return children;
}
