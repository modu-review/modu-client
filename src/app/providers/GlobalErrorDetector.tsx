'use client';

import {useEffect} from 'react';
import {useGlobalError} from '@/entities/error';
import isPredictableServerError from '@/shared/lib/utils/isPredictableServerError';
import isClientError from '@/shared/lib/utils/isClientError';
import toast from '@/shared/lib/utils/toastService';
import {ERROR_MESSAGE, SERVER_ERROR_MESSAGE} from '@/shared/lib/consts/errorMessage';

type Props = {
  children: React.ReactNode;
};

export default function GlobalErrorDetector({children}: Props) {
  const globalError = useGlobalError();

  useEffect(() => {
    if (!globalError) return;

    if (isPredictableServerError(globalError)) {
      toast.error({
        title: '에러가 발생했어요.',
        description: SERVER_ERROR_MESSAGE[globalError.errorCode],
      });

      return;
    }

    if (isClientError(globalError)) {
      toast.error({
        title: "에러가 발생했어요.",
        description: ERROR_MESSAGE[globalError.errorCode]
      })

      return;
    }

    // 미리 약속한 에러가 아닌 경우 전역 에러 바운더리로 처리합니다.
    throw globalError;
  }, [globalError]);

  return children;
}
