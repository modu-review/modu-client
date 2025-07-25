import Link from 'next/link';
import UserInfo from './UserInfo';
import ReviewTabs from './ReviewTabs';
import {Sidebar} from '@/widgets/side-bar';
import checkSession from '@/shared/lib/utils/checkSession';
import {LucideIcon} from '@/shared/ui/icons';

export default async function MyPage() {
  await checkSession();

  return (
    <section className="fixed inset-0 w-full h-full z-20 bg-white overflow-auto">
      <section className="w-full mb-4 md:mb-8">
        <section className="bg-lightBlue p-4 flex flex-col justify-between mb-[90px] md:mb-[110px] lg:mb-[130px]">
          <header className="flex items-center justify-between mt-2 px-2 md:px-4">
            <div className="flex items-center gap-2">
              <Link href="/" aria-label="메인 페이지로 이동">
                <LucideIcon
                  name="House"
                  className="w-7 h-7 lg:w-8 lg:h-8 text-boldBlue hover:scale-110 transition-transform"
                />
              </Link>
              <h2 className="text-2xl lg:text-3xl text-boldBlue font-bold">마이페이지</h2>
            </div>
            <Sidebar />
          </header>
          <UserInfo />
        </section>
        <ReviewTabs />
      </section>
    </section>
  );
}
