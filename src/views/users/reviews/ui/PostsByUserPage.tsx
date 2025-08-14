import {Suspense} from 'react';
import UserInfo from './UserInfo';
import {UserPostsList} from '@/features/users/posts';
import {UserPostLoading} from '@/entities/users';

type Props = {
  params: Promise<{userEmail: string}>;
};
export default async function PostsByUserPage({params}: Props) {
  const {userEmail} = await params;

  return (
    <section className="w-full max-w-[1230px] mx-auto">
      <UserInfo />
      <Suspense fallback={<UserPostLoading />}>
        <UserPostsList userEmail={userEmail} />
      </Suspense>
    </section>
  );
}
