import LoginButton from './LoginButton';

type Props = {
  onClose: () => void;
};

export default function LoginModal({onClose}: Props) {
  return (
    <section className="w-[350px] md:w-[400px] h-[200px] md:h-[230px] bg-white z-30 rounded-lg flex flex-col gap-10 items-center animate-fade-up">
      <div className="flex-1 text-center mt-12 md:mt-[4rem]">
        <h3 className="text-xl md:text-2xl font-bold mb-2">로그인 후 이용 가능한 서비스입니다.</h3>
        <p className="text-sm md:text-base text-gray-500">로그인하면 더 많은 기능을 이용할 수 있어요.</p>
      </div>
      <div className="flex items-center w-full gap-9 px-8 md:px-6 mb-8 md:mb-10 font-semibold md:text-lg">
        <button
          className="w-full py-1.5 bg-gray-300 text-black rounded-md hover:bg-gray-300/80 transition-colors"
          aria-label="닫기"
          onClick={onClose}
        >
          닫기
        </button>
        <LoginButton />
      </div>
    </section>
  );
}
