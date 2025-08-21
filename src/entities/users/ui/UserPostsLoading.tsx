import UserPostLoading from './UserPostLoading';
import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function UserPostsLoading() {
  return (
    <section className="px-4 md:px-6 lg:px-12">
      <header className="flex items-center gap-1.5 mb-4">
        <h3 className="text-lg md:text-xl font-semibold">전체 게시글 수</h3>
        <Skeleton className="w-[20px] h-[24px] mt-0.5" />
      </header>
      <div className="flex justify-end">
        <div className="block md:hidden mb-6 md:mr-5 w-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm relative">
          최신순
        </div>
        <div className="hidden md:flex gap-4 mb-6 md:mr-5">
          {['최신순', '북마크순', '댓글순'].map((name, index) => (
            <p
              key={index}
              className={`text-[15px] ${name === '최신순' ? 'font-extrabold text-boldBlue' : 'text-gray-400'}`}
              style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'}}
            >
              {name}
            </p>
          ))}
        </div>
      </div>
      <ul className="space-y-6">
        {Array.from({length: 6}).map((_, index) => (
          <UserPostLoading key={index} />
        ))}
      </ul>
    </section>
  );
}
