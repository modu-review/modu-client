export default function NotificationHeader() {
  return (
    <header className="grid grid-cols-[1fr_0.5fr] text-center bg-white rounded-full mx-3 md:mx-10 px-6 md:px-8 py-4 text-sm md:text-base font-semibold shadow-md shadow-gray-400">
      <p className="md:text-start md:ml-24">알림 내용</p>
      <p className="ml-4">시간</p>
    </header>
  );
}
