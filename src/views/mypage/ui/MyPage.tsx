import {Metadata} from 'next';
import UserInfo from './UserInfo';
import ReviewTabs from './ReviewTabs';
import checkSession from '@/shared/lib/utils/checkSession';

export const metadata: Metadata = {
  title: '내 정보',
  description: '내 정보와 저장 및 작성한 후기글을 확인해보세요.',
};

export default async function MyPage() {
  await checkSession();

  return (
    <section className="w-full max-w-[1230px] mx-auto">
      <UserInfo />
      <ReviewTabs />
    </section>
  );
}
