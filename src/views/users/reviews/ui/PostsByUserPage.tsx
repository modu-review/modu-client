import {Suspense} from 'react';
import UserInfo from './UserInfo';
import {UserPostsList} from '@/features/users/posts';
import {UserPostsLoading} from '@/entities/users';

type Props = {
  params: Promise<{userNickname: string}>;
};

export async function generateMetadata({params}: Props) {
  const {userNickname} = await params;
  const decodedUserNickname = decodeURIComponent(userNickname);

  return {
    title: `${decodedUserNickname}님의 후기글 모음`,
    description: `${decodedUserNickname}님의 후기글을 모아보세요.`,
  };
}

export default async function PostsByUserPage({params}: Props) {
  const {userNickname} = await params;
  const decodedUserNickname = decodeURIComponent(userNickname);
  return (
    <section className="w-full max-w-[1230px] h-full mx-auto pb-6 bg-[#f1f5f9] md:pb-10 md:bg-white lg:bg-white">
      <UserInfo userNickname={decodedUserNickname} />
      <Suspense fallback={<UserPostsLoading />}>
        <UserPostsList userNickname={decodedUserNickname} />
      </Suspense>
    </section>
  );
}
