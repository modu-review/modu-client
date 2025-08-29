import UserInfoAvatar from './UserInfoAvatar';
import UserInfoAvatarLoading from './UserInfoAvatarLoading';
import {useUserEmail, useUserNickname} from '@/entities/auth';
import {RQProvider} from '@/shared/providers';

export default function UserInfo() {
  const userNickname = useUserNickname();
  const userEmail = useUserEmail();

  return (
    <div className="flex items-center gap-2">
      {userNickname ? (
        <RQProvider LoadingFallback={<UserInfoAvatarLoading />}>
          <UserInfoAvatar userNickname={userNickname} />
        </RQProvider>
      ) : (
        <UserInfoAvatarLoading />
      )}
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{userNickname}</span>
        <span className="text-xs text-gray-500">{userEmail}</span>
      </div>
    </div>
  );
}
