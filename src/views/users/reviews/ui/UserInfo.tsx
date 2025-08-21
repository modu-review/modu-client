'use client';

import Image from 'next/image';

type Props = {
  userNickname: string;
};

export default function UserInfo({userNickname}: Props) {
  return (
    <section className="px-5 pt-10 pb-10 md:pb-14 lg:pb-20">
      <div className="flex items-start">
        <div className="w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white flex justify-center items-center mr-2 md:mr-4 rounded-full border-boldBlue border-[7px] overflow-hidden">
          <Image
            src="https://picsum.photos/seed/ee2/200/200"
            alt={`${userNickname} 프로필 사진`}
            width={160}
            height={160}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <p className="text-base md:text-xl mt-20 lg:text-2xl font-bold mb-2">
          {userNickname} 님의 <span className="text-xl md:text-3xl">프로필 </span>
        </p>
      </div>

      <div className="mt-6 md:mt-2 lg:mt-0">
        <div className="h-1.5 md:h-2 w-full bg-boldBlue rounded-full md:w-[680px] lg:w-[860px] mx-auto"></div>
      </div>
    </section>
  );
}
