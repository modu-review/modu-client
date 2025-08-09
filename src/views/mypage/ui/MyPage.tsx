import UserInfo from './UserInfo';
import ReviewTabs from './ReviewTabs';
import checkSession from '@/shared/lib/utils/checkSession';

export default async function MyPage() {
  await checkSession();

  return (
    <section>
      <section className="w-full mb-4 md:mb-8">
        <section className="p-4 flex flex-col justify-between mb-[90px] md:mb-[110px] lg:mb-[130px]">
          <UserInfo />
        </section>
        <ReviewTabs />
      </section>
    </section>
  );
}
