import {HTMLAttributes} from 'react';
import Image from 'next/image';
import {cva, VariantProps} from 'class-variance-authority';
import {useGetProfileImageByUserNickname} from '@/entities/users';
import {cn} from '@/shared/lib/utils/cn';

const profileImageVariant = cva(
  'flex justify-center items-center rounded-full border-boldBlue border-[7px] overflow-hidden',
  {
    variants: {
      page: {
        my: 'w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48',
        postsByUser: 'w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48',
      },
    },
  },
);

type Props = {
  userNickname: string;
} & HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof profileImageVariant>;

export default function ProfileImage({userNickname, className, page}: Props) {
  const {data} = useGetProfileImageByUserNickname(userNickname);

  return (
    <div className={cn(className, profileImageVariant({page}))}>
      <Image
        src={data.profileImage}
        alt={`${userNickname} 프로필 이미지`}
        width={160}
        height={160}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
}
