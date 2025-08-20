import {useUserNickname} from '@/entities/auth';
import {Avatar} from '@/shared/ui/components';

export default function UserInfo() {
  const userNickname = useUserNickname();

  return (
    <div className="flex items-center gap-2">
      <Avatar src="https://picsum.photos/200/200" alt={`${userNickname} 프로필 사진`} rounded="rounded-xl" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{userNickname}</span>
      </div>
    </div>
  );
}
