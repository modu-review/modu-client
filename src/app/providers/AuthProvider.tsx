'use client';

import {useEffect} from 'react';
import {getSession, useUpdateUser} from '@/entities/auth';

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({children}: Props) {
  const updateUser = useUpdateUser();

  useEffect(() => {
    getSession().then(updateUser);
  }, [updateUser]);

  return children;
}
