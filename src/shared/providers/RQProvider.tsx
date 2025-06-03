'use client';

import {Suspense} from 'react';
import {QueryErrorResetBoundary} from '@tanstack/react-query';
import {ErrorBoundary} from 'react-error-boundary';
import {ErrorFallback} from '../ui/components';

type Props = {
  children: React.ReactNode;
  LoadingFallback: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export default function RQProvider({children, LoadingFallback, icon, className}: Props) {
  return (
    <QueryErrorResetBoundary>
      {({reset}) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({error, resetErrorBoundary}) => (
            <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} icon={icon} className={className} />
          )}
        >
          <Suspense fallback={LoadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
