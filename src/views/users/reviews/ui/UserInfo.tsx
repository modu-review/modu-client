'use client';

import Image from 'next/image';
import {useUserEmail, useUserId} from '@/entities/auth';
import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function UserInfo() {
  const userId = useUserId();
  const userEmail = useUserEmail();

  return (
    <section className="bg-slate-400 px-5 pt-10 pb-10 md:pb-14 lg:pb-20">
      <div className="flex items-start">
        <div className="w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white flex justify-center items-center mr-4 rounded-full border-boldBlue border-[7px] overflow-hidden">
          <Image
            src="https://picsum.photos/seed/ee2/200/200"
            alt={`${userId} 프로필 사진`}
            width={160}
            height={160}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center mt-20">
          {userId ? (
            <p className="text-xl lg:text-2xl font-bold mb-2">{userId}</p>
          ) : (
            <Skeleton className="h-5 md:h-6 lg:h-7 w-32 md:w-36 lg:w-40 mb-1 mt-2 md:mt-0" />
          )}
          {userEmail ? (
            <p className="text-sm md:text-base font-semibold text-boldBlue">{userEmail}</p>
          ) : (
            <Skeleton className="h-4 md:h-5 lg:h-6 w-40 md:w-48 lg:w-52" />
          )}
        </div>
      </div>

      <div className="mt-6 md:mt-2 lg:mt-0">
        <div className="h-2 w-full bg-boldBlue rounded-full md:w-[680px] lg:w-[860px] mx-auto" />
      </div>
    </section>
  );
}
