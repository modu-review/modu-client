import {useUserEmail, useUserId} from '@/entities/auth';
import {Avatar} from '@/shared/ui/components';

export default function UserInfo() {
  const userId = useUserId();
  const userEmail = useUserEmail();

  return (
    <div>
      <Avatar src="https://picsum.photos/200/200" alt={`${userId} 프로필 사진`} />
      <div>
        <span>{userId}</span>
        <span>{userEmail}</span>
      </div>
    </div>
  );
}
