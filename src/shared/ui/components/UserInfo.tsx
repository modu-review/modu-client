import Image from 'next/image';

type Props = {
  profileImage: string;
  userId: string;
};

export default function UserInfo({profileImage, userId}: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full flex justify-center items-center w-10 h-10 bg-mediumBlue">
        <Image
          className="rounded-full bg-white object-cover"
          src={profileImage}
          alt={`${userId}님의 프로필 이미지`}
          width={35}
          height={35}
        />
      </div>
      <p>{userId}</p>
    </div>
  );
}
