import {cn} from '@/shared/lib/utils/cn';
import {LucideIcon} from '../icons';

type Props = {
  text?: string;
  className?: HTMLDivElement['className'];
};

export default function LoadingSpinner({text, className}: Props) {
  return (
    <section className={cn('w-full h-full flex flex-col justify-center items-center animate-pulse', className)}>
      {text && <p className="text-xl md:text-2xl font-semibold mb-4">{text}</p>}
      <LucideIcon name="Disc3" className="animate-spin w-[40px] h-[40px] md:w-[45px] md:h-[45px]" />
    </section>
  );
}
