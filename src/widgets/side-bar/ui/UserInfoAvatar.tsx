import {useGetProfileImageByUserNickname} from '@/entities/users';
import {Avatar} from '@/shared/ui/components';

type Props = {
  userNickname: string;
};

export default function UserInfoAvatar({userNickname}: Props) {
  const {
    data: {profileImage},
  } = useGetProfileImageByUserNickname(userNickname);

  return <Avatar src={profileImage} alt={`${userNickname} 프로필 사진`} rounded="rounded-xl" />;
}
