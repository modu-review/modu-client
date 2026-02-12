'use client';

import {FallbackProps} from 'react-error-boundary';

export default function Error({error, resetErrorBoundary}: FallbackProps) {
  // TODO: 에러 UI 및 초기화 버튼 표시
  return <div>Error {error}</div>;
}
