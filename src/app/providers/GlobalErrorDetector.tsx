'use client';

import {useEffect} from 'react';
import {useGlobalError} from '@/entities/error';

type Props = {
  children: React.ReactNode;
};

export default function GlobalErrorDetector({children}: Props) {
  const globalError = useGlobalError();

  useEffect(() => {
    if (!globalError) return;

    console.error(globalError);
  }, [globalError]);

  return children;
}
