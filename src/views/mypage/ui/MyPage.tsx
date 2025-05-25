import checkSession from '@/shared/lib/utils/checkSession';
import UserInfo from './UserInfo';
import ReviewTabs from './ReviewTabs';

export default async function MyPage() {
  // await checkSession();

  return (
    <section className="fixed inset-0 w-full h-full bg-white overflow-auto">
      <section className="bg-lightBlue p-4 flex flex-col justify-between mb-[90px] md:mb-[110px]">
        <h2 className="text-2xl text-boldBlue font-bold">마이페이지</h2>
        <UserInfo />
      </section>
      <ReviewTabs />
    </section>
  );
}
