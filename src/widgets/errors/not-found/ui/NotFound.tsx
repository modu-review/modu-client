'use client';

import {Button} from '@/shared/shadcnComponent/ui/button';
import {LucideIcon} from '@/shared/ui/icons';
import Link from 'next/link';

function NotFound() {
  return (
    <section className="h-full flex flex-col items-center justify-center text-center gap-4">
      <div>
        <LucideIcon className="mb-4 mx-auto w-32 h-32 md:w-40 md:h-40" name="MonitorX" color="grey" />
        <h2 className="text-2xl md:text-4xl">해당 페이지는 찾을 수 없어요.</h2>
      </div>
      <div>
        <p>서비스 중이지 않은 경로입니다.</p>
        <p>아래 버튼을 클릭해 메인 페이지로 이동할 수 있어요.</p>
      </div>
      <Link href="/">
        <Button className="px-6 mt-4">이동하기</Button>
      </Link>
    </section>
  );
}

export default NotFound;
