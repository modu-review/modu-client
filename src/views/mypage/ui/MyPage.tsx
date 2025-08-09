import UserInfo from './UserInfo';
import ReviewTabs from './ReviewTabs';
import checkSession from '@/shared/lib/utils/checkSession';

export default async function MyPage() {
  await checkSession();

  return (
    <section>
      <UserInfo />
      <ReviewTabs />
    </section>
  );
}
