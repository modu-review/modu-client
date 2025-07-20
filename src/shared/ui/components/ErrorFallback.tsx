'use client';

import {cva, VariantProps} from 'class-variance-authority';
import {cn} from '@/shared/lib/utils/cn';
import {Button} from '@/shared/shadcnComponent/ui/button';

const errorFallbackVariants = cva('flex flex-col items-center p-4 text-sm md:text-base', {
  variants: {
    withIcon: {
      true: 'h-full justify-center pb-20',
      false: '',
    },
  },
  defaultVariants: {
    withIcon: false,
  },
});

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

type ErrorFallbackProps = FallbackProps &
  VariantProps<typeof errorFallbackVariants> & {
    icon?: React.ReactNode;
    className?: string;
    title?: string;
  };

export default function ErrorFallback({
  error,
  resetErrorBoundary,
  icon,
  className,
  title = '데이터를 가져오는 데 실패했어요.',
}: ErrorFallbackProps) {
  const withIcon = icon ? true : false;

  return (
    <section className={cn(errorFallbackVariants({withIcon}), className)}>
      {icon && icon}
      <h2 className="text-xl md:text-2xl mb-3">{title}</h2>
      <p className="mb-4">실패 이유: {error.message}</p>
      <p>인터넷 연결 상태 혹은 서버의 응답 오류일 수 있어요.</p>
      <p className="mb-4">아래 버튼을 클릭해 다시 시도해주세요.</p>
      <Button onClick={resetErrorBoundary}>다시 시도하기</Button>
    </section>
  );
}
