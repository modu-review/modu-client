import {Suspense} from 'react';
import UserInfo from './UserInfo';
import {UserPostsList} from '@/features/users/posts';
import UserPostsLoading from '@/features/users/posts/ui/UserPostsLoading';

type Props = {
  params: Promise<{userId: string}>;
};
export default async function PostsByUserPage({params}: Props) {
  const {userId} = await params;

  return (
    <section className="w-full max-w-[1230px] mx-auto">
      <UserInfo />
      {/* <Suspense fallback={<UserPostsLoading />}> */}
      <UserPostsList userId={userId} />
      {/* </Suspense> */}
    </section>
  );
}
