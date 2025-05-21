import UserInfo from './UserInfo';

export default function MyPage() {
  return (
    <section className="fixed inset-0 w-full h-full bg-white">
      <section className="bg-lightBlue p-4 flex flex-col justify-between">
        <h2 className="text-2xl text-boldBlue font-bold">마이페이지</h2>
        <UserInfo />
      </section>
    </section>
  );
}
