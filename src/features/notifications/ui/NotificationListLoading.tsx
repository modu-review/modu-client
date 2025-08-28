import NotificationCardLoading from './NotificationCardLoading';

export default function NotificationListLoading() {
  return (
    <ul className="min-h-[80%] max-h-[310px] md:max-h-[600px] mt-6 md:mt-8 mx-2 md:mx-10 bg-white rounded-lg shadow-md shadow-gray-300 overflow-y-auto">
      {Array.from({length: 7}).map((_, index) => (
        <NotificationCardLoading key={index} />
      ))}
    </ul>
  );
}
