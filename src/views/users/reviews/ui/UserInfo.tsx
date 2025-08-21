'use client';

import Image from 'next/image';

type Props = {
  userNickname: string;
};

export default function UserInfo({userNickname}: Props) {
  return (
    <section className="flex justify-center px-5 pt-8 pb-8 md:pb-14 md:pt-10 lg:pb-20 lg:pt-10">
      <div className="">
        <div className="w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white flex justify-center items-center mr-4 rounded-full border-boldBlue border-[7px] overflow-hidden">
          <Image
            src="https://picsum.photos/seed/ee2/200/200"
            alt={`${userNickname} 프로필 사진`}
            width={160}
            height={160}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <p className="text-xl mt-4 lg:text-2xl font-bold mb-2">{userNickname}</p>
      </div>
    </section>
  );
}
