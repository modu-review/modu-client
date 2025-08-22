'use client';

import {Suspense} from 'react';
import {ProfileImage, ProfileImageLoading, EditProfileImage} from '@/features/users/profileImage';
import {useUserNickname} from '@/entities/auth';
import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';

export default function UserInfo() {
  const userNickname = useUserNickname();

  return (
    <section className="flex flex-col items-center mt-10 md:mt-8 lg:mt-10">
      <div className="relative">
        {userNickname ? (
          <Suspense fallback={<ProfileImageLoading page="my" />}>
            <ProfileImage userNickname={userNickname} page="my" />
            <EditProfileImage />
          </Suspense>
        ) : (
          <ProfileImageLoading page="my" />
        )}
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
