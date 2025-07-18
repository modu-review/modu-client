import {useGoLoginPage} from '@/entities/auth';
import {useGetFullPathName} from '@/shared/hooks';

export default function LoginButton() {
  const fullPath = useGetFullPathName();
  const {goLoginPage} = useGoLoginPage();

  const handleClickLoginButton = () => {
    goLoginPage(fullPath);
  };

  return (
    <button
      type="button"
      onClick={handleClickLoginButton}
      aria-label="로그인"
      className="w-full text-center bg-boldBlue text-white py-1.5 font-semibold rounded-md hover:bg-extraboldBlue transition-colors mb-3"
    >
      로그인
    </button>
  );
}
