type ErrorMessage = Record<string, string>;

export const SERVER_ERROR_MESSAGE: ErrorMessage = {
  // 로그인 관련 에러 코드
  TOKEN_NOT_FOUND: '서비스 이용에 로그인이 필요해요.',
  TOKEN_EXPIRED: '로그인 세션이 만료되었어요. 다시 로그인해주세요.',
  TOKEN_INVALID: '로그인 세션이 유효하지 않아요. 다시 로그인해주세요.',

  // 서버 내부적인 에러로 예측 불가
  INTERNAL_SERVER_ERROR: '서버가 원할하지 않아요. 잠시 후 다시 시도해주세요.',
} as const;

export const ERROR_MESSAGE = {
  // 로그인 관련 에러 코드
  LOGIN_REQUIRED: '로그인이 필요한 서비스에요.',

  // 검색 API 에러 코드
  INPUT_EMPTY: '검색어를 입력해주세요.',
  INPUT_TOO_SHORT: '검색어는 2글자 이상 입력해주세요.',
  INPUT_TOO_LONG: '검색어는 20글자 이하로 입력해주세요.',
  INPUT_HANGUL_JAMO: '완성된 한글을 입력해주세요.',
  INPUT_SPECIAL_CHARS_ONLY: '특수문자만으로는 검색할 수 없어요.',
  INPUT_ONLY_NUMBERS: '숫자만으로는 검색할 수 없어요.',
  INPUT_SPECIAL_AND_NUMBERS_ONLY: '특수문자와 숫자만으로는 검색할 수 없어요.',

  // OAuth2 로그인 에러
  EMPTY_USER_EMAIL: '이메일 정보가 존재하지 않아요.',
} as const;
