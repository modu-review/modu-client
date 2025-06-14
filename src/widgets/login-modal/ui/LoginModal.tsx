import Link from 'next/link';

type Props = {
  onClose: () => void;
};

export default function LoginModal({onClose}: Props) {
  return (
    <section className="w-[300px] h-[130px] bg-white z-30 rounded-lg flex flex-col items-center">
      <div className="flex-1 mt-5 text-center">
        <h3 className="md:text-lg">로그인 후 이용 가능한 서비스입니다.</h3>
        <p className="text-sm text-gray-500">로그인하면 더 많은 기능을 이용할 수 있어요.</p>
      </div>
      <div className="flex items-center w-full gap-1 px-3 mb-3">
        <Link className="w-full" href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`}>
          <button
            className="w-full py-1.5 bg-boldBlue text-white rounded-md hover:bg-boldBlue/80 transition-colors"
            aria-label="로그인하기"
          >
            로그인하기
          </button>
        </Link>
        <button
          className="w-full py-1.5 bg-gray-300 text-black rounded-md hover:bg-gray-300/80 transition-colors"
          aria-label="닫기"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </section>
  );
}
