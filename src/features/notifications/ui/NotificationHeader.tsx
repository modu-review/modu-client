export default function NotificationHeader() {
  return (
    <header className="flex items-center bg-white rounded-full mx-3 md:mx-0 px-6 md:px-8 py-4 text-sm md:text-base font-semibold shadow-md shadow-gray-400">
      <p className="flex-[0.5] ml-3 md:ml-8">알림 내용</p>
      <p className="flex-[0.3] text-center">시간</p>
      <p className="flex-[0.2] text-center">상태</p>
    </header>
  );
}
