import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function CommentCardLoading() {
  return (
    <section className="flex gap-3 mx-2 px-3 pt-5 pb-6 mb-5 bg-slate-100 rounded-lg">
      <Skeleton className="min-w-10 h-10 md:min-w-11 md:h-11 rounded-full" />
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-5 w-28 md:w-32" />
          <Skeleton className="h-4 w-24 md:w-28" />
        </div>
        <Skeleton className="h-7 w-full md:w-[320px] mb-4" />
      </div>
    </section>
  );
}
