import {useGetProfileImageByUserNickname} from '@/entities/users';
import Image from 'next/image';

type Props = {
  userNickname: string;
  className?: HTMLDivElement['className'];
};

export default function ProfileImage({userNickname, className}: Props) {
  const {data} = useGetProfileImageByUserNickname(userNickname);

  return (
    <div className={className}>
      <Image
        src={data.profileImage}
        alt="프로필 이미지"
        width={160}
        height={160}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
}
