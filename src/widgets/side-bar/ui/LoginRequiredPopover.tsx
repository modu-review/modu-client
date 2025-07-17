import Link from 'next/link';
import {Popover, PopoverContent, PopoverTrigger} from '@/shared/shadcnComponent/ui/popover';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  title: string;
};

export default function LoginRequiredPopover({title}: Props) {
  const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL;

  if (!LOGIN_URL) {
    throw new Error('로그인 URL이 환경변수에 정의되지 않았습니다.');
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center text-muted-foreground gap-1 hover:text-boldBlue transition-colors">
          <LucideIcon name="LockKeyhole" size={20} /> <span>{title}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col">
          <h3 className="font-semibold mb-2">로그인 후 이용할 수 있어요.</h3>
          <p className="text-sm text-muted-foreground mb-1">로그인하면 더 많은 기능을 이용할 수 있어요.</p>
          <Link
            href={LOGIN_URL}
            className="w-full text-center text-sm bg-boldBlue text-white py-1.5 font-semibold rounded-md hover:bg-extraboldBlue transition-colors"
          >
            로그인하기
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
