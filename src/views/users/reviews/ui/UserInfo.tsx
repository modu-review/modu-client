'use client';

import {Suspense} from 'react';
import {ProfileImage, ProfileImageLoading} from '@/features/users/profileImage';

type Props = {
  userNickname: string;
};
export default function UserInfo({userNickname}: Props) {
  return (
    <section className="flex justify-center px-5 pt-8 pb-8 md:pb-14 md:pt-10 lg:pb-20 lg:pt-10">
      <div className="flex flex-col items-center">
        <Suspense fallback={<ProfileImageLoading page="postsByUser" />}>
          <ProfileImage page="postsByUser" userNickname={userNickname} />
        </Suspense>

        <p className="text-xl mt-4 lg:text-2xl font-bold mb-2">
          {userNickname}
          {/* <div className=" text-3xl">게시글</div> */}
        </p>
      </div>
    </section>
  );
}
