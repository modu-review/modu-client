import {Suspense} from 'react';
import UserInfo from './UserInfo';
import {UserPostsList} from '@/features/users/posts';
import {UserPostsLoading} from '@/entities/users';

type Props = {
  params: Promise<{userNickname: string}>;
};
export default async function PostsByUserPage({params}: Props) {
  const {userNickname} = await params;
  const decodedUserNickname = decodeURIComponent(userNickname);
  return (
    <section className="w-full max-w-[1230px] mx-auto pb-6 md:pb-10">
      <UserInfo userNickname={decodedUserNickname} />
      <Suspense fallback={<UserPostsLoading />}>
        <UserPostsList userNickname={decodedUserNickname} />
      </Suspense>
    </section>
  );
}
