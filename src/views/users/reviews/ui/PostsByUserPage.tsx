import {Suspense} from 'react';
import UserInfo from './UserInfo';
import {UserPostsList} from '@/features/users/posts';
import {UserPostLoading} from '@/entities/users';

type Props = {
  params: Promise<{userNickname: string}>;
};
export default async function PostsByUserPage({params}: Props) {
  const {userNickname} = await params;
  const decodedUserNickname = decodeURIComponent(userNickname);
  return (
    <section className="w-full max-w-[1230px] mx-auto">
      <UserInfo userNickname={decodedUserNickname} />
      <Suspense fallback={<UserPostLoading />}>
        <UserPostsList userNickname={decodedUserNickname} />
      </Suspense>
    </section>
  );
}
