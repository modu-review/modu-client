'use client';

import {Button} from '@/shared/shadcnComponent/ui/button';
import {LucideIcon} from '@/shared/ui/icons';
import Link from 'next/link';

export default function ReviewNotFound() {
  return (
    <section className="h-full flex flex-col items-center justify-center text-center gap-4">
      <div>
        <LucideIcon className="mb-4 mx-auto w-32 h-32 md:w-40 md:h-40" name="SearchX" color="grey" />
        <h2 className="text-2xl md:text-4xl">리뷰를 찾을 수 없어요.</h2>
      </div>
      <div>
        <p>이미 삭제되었거나 존재하지 않는 리뷰입니다.</p>
        <p>아래 버튼을 클릭해 메인 페이지로 이동할 수 있어요.</p>
      </div>
      <Link href="/">
        <Button className="px-6 mt-4">이동하기</Button>
      </Link>
    </section>
  );
}
