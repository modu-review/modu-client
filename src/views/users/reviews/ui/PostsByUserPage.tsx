import {Suspense} from 'react';
import UserInfo from './UserInfo';
import {UserPostsList} from '@/features/users/posts';
import {UserPostLoading} from '@/entities/users';

type Props = {
  params: Promise<{userNickname: string}>;
};
export default async function PostsByUserPage({params}: Props) {
  const {userNickname} = await params;

  return (
    <section className="w-full max-w-[1230px] mx-auto">
      <UserInfo userNickname={userNickname} />
      <Suspense fallback={<UserPostLoading />}>
        <UserPostsList userNickname={userNickname} />
      </Suspense>
    </section>
  );
}
