'use client';

import Image from 'next/image';
import {useUserEmail, useUserId} from '@/entities/auth';
import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function UserInfo() {
  const userId = useUserId();
  const userEmail = useUserEmail();

  return (
    <section className="">
      <div className="w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white flex justify-center items-center rounded-full border-lightBlue border-[6px] overflow-hidden">
        <Image
          // TODO: 실제 사용자 프로필 이미지로 변경
          src="https://picsum.photos/200/200"
          alt={`${userId} 프로필 사진`}
          width={160}
          height={160}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="">
        {userId ? (
          <p className="text-lg md:text-xl lg:text-2xl text-boldBlue font-semibold mb-1 md:mb-2">{userId}</p>
        ) : (
          <Skeleton className="h-5 md:h-6 lg:h-7 w-32 md:w-36 lg:w-40 mb-3" />
        )}
        {userEmail ? (
          <p className="text-sm md:text-base lg:text-lg text-boldBlue">{userEmail}</p>
        ) : (
          <Skeleton className="h-4 md:h-5 lg:h-6 w-40 md:w-48 lg:w-52" />
        )}
      </div>
    </section>
  );
}
