import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function UserPostLoading() {
  return (
    <section className="flex flex-col-reverse md:flex-row md:justify-between rounded-md md:rounded-none overflow-hidden shadow-xl shadow-gray-500 md:shadow-none md:px-4 md: border-b-2 md:border-gray-400 md:pb-6 mb-6">
      <div className="flex flex-col">
        <div className="p-4 md:p-0 flex flex-col md:flex-1">
          <Skeleton className="w-[220px] h-[22px] md:w-[250px] mb-1" />
          <Skeleton className="w-[160px] h-[18px] mb-2" />
          <Skeleton className="w-[140px] h-[18px] mb-3" />
          <Skeleton className="w-full md:w-[350px] lg:w-[500px] h-[55px] md:h-[65px]" />
        </div>
        <div className="flex gap-6 border-t md:border-none px-4 pt-4 md:p-0">
          <Skeleton className="w-[50px] h-[25px] mb-3" />
          <Skeleton className="w-[50px] h-[25px] mb-3" />
        </div>
      </div>
      <Skeleton className="w-full h-[300px] md:w-[200px] md:h-[200px]" />
    </section>
  );
}
