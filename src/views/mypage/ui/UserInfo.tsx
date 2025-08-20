'use client';

import Image from 'next/image';
import {useUserNickname} from '@/entities/auth';
import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function UserInfo() {
  const userNickname = useUserNickname();

  return (
    <section className="flex flex-col items-center mt-10 md:mt-8 lg:mt-10">
      <div className="w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white flex justify-center items-center rounded-full border-boldBlue border-[7px] overflow-hidden">
        <Image
          // TODO: 실제 사용자 프로필 이미지로 변경
          src="https://picsum.photos/seed/ee2/200/200"
          alt={`${userNickname} 프로필 사진`}
          width={160}
          height={160}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="flex flex-col items-center mt-3">
        {userNickname ? (
          <p className="text-xl lg:text-2xl font-bold">{userNickname}</p>
        ) : (
          <Skeleton className="h-5 md:h-6 lg:h-7 w-32 md:w-36 lg:w-40 mb-1 mt-2 md:mt-0" />
        )}
      </div>
    </section>
  );
}
