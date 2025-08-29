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
        isLoggedIn: true,
        userNickname: decodeURIComponent(session.userNickname),
        userEmail: session.userEmail,
      });
    } else {
      updateUser({
        isLoggedIn: false,
        userNickname: null,
        userEmail: null,
      });
    }
  }, [updateUser, session, isSuccess]);

  return children;
}
