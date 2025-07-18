const LOGIN_URL = 'https://api.modu-review.com/oauth2/authorization/kakao';
const REDIRECT_STORAGE_KEY = 'redirectAfterLogin';

export default function useGoLoginPage() {
  const goLoginPage = (previousPath?: string) => {
    if (previousPath) {
      sessionStorage.setItem(REDIRECT_STORAGE_KEY, previousPath);
    }

    window.location.href = LOGIN_URL;
  };

  return {goLoginPage};
}
