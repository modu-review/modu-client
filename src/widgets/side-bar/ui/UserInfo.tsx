import {useUserEmail, useUserId} from '@/entities/auth';
import {Avatar} from '@/shared/ui/components';

export default function UserInfo() {
  const userId = useUserId();
  const userEmail = useUserEmail();

  return (
    <div className="flex items-center gap-2">
      <Avatar src="https://picsum.photos/200/200" alt={`${userId} 프로필 사진`} rounded="rounded-xl" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{userId}</span>
        <span className="text-xs text-muted-foreground">{userEmail}</span>
      </div>
    </div>
  );
}
