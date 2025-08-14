import {Suspense} from 'react';
import UserInfo from './UserInfo';
import {UserPostsList} from '@/features/users/posts';
import {UserPostLoading} from '@/entities/users';

type Props = {
  params: Promise<{userId: string}>;
};
export default async function PostsByUserPage({params}: Props) {
  const {userId} = await params;

  return (
    <section className="w-full max-w-[1230px] mx-auto">
      <UserInfo userId={userId} />
      <Suspense fallback={<UserPostLoading />}>
        <UserPostsList userId={userId} />
      </Suspense>
    </section>
  );
}
