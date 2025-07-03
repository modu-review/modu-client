import {cn} from '@/shared/lib/utils/cn';
import {LucideIcon} from '../icons';

type Props = {
  text?: string;
  className?: HTMLDivElement['className'];
  textSize?: string;
  iconSize?: string;
};

export default function LoadingSpinner({
  text,
  className,
  textSize = 'text-lg md:text-xl lg:text-2xl',
  iconSize = 'w-[40px] h-[40px] md:w-[45px] md:h-[45px]',
}: Props) {
  return (
    <section className={cn('w-full h-full flex flex-col justify-center items-center animate-pulse', className)}>
      {text && <p className={cn(textSize, 'font-semibold mb-4')}>{text}</p>}
      <LucideIcon name="Disc3" className={cn('animate-spin', iconSize)} />
    </section>
  );
}
