'use client';

import {useEffect} from 'react';
import {Button} from '@/shared/shadcnComponent/ui/button';
import {LucideIcon} from '@/shared/ui/icons';
import {reportErrorToSentry} from '@/shared/lib/utils/reportErrorToSentry';

type Props = {
  error: Error & {digest?: string};
};

function GlobalErrorBoundary({error}: Props) {
  useEffect(() => {
    reportErrorToSentry({level: 'fatal', error, type: 'Rendering'});
  }, [error]);

  return (
    <section className="h-full flex flex-col items-center justify-center text-center gap-4">
      <div>
        <LucideIcon className="mb-4 mx-auto w-24 h-24 md:w-40 md:h-40" name="CloudRainWind" color="grey" />
        <h2 className="text-2xl md:text-4xl">알 수 없는 오류가 발생했어요.</h2>
      </div>
      <div>
        <p>인터넷 연결 상태 확인 후 다시 시도해주세요.</p>
        <p>아래 버튼을 클릭해 새로고침할 수 있어요.</p>
      </div>
      <Button className="px-6" onClick={() => window.location.reload()}>
        새로고침
      </Button>
    </section>
  );
}

export default GlobalErrorBoundary;
