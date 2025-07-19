type Props = {
  text?: string;
  className?: HTMLButtonElement['className'];
};

export default function LoginButtonLoading({text = '로그인', className}: Props) {
  return (
    <button
      type="button"
      disabled
      aria-label={`${text} 버튼 로딩 중`}
      className={`w-full text-center bg-boldBlue text-white py-1.5 font-semibold rounded-md hover:bg-extraboldBlue transition-colors ${className}`}
    >
      {text}
    </button>
  );
}
