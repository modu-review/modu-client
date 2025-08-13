import {Suspense} from 'react';
import UserInfo from './UserInfo';
import {UserPostsList} from '@/features/users/posts';

type Props = {
  params: Promise<{userId: string}>;
};
export default async function PostsByUserPage({params}: Props) {
  const {userId} = await params;

  return (
    <section>
      {/* <UserInfo /> TODO: 최상단 프로필 사진구현 */}

      {/* <Suspense fallback={<UserPostsLoading />}> //TODO: 로딩시 skeleton UI 구현
            <UserPostsList /> //TODO: 프로필 하단에 사용자별 게시글보여주기 UI 구현
        </Suspense> */}
    </section>
  );
}
