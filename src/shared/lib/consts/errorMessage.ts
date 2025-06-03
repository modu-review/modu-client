type ErrorMessage = Record<string, string>;

export const SERVER_ERROR_MESSAGE: ErrorMessage = {
  // 로그인 관련 에러 코드
  TOKEN_NOT_FOUND: '서비스 이용에 로그인이 필요해요.',
  TOKEN_EXPIRED: '로그인 세션이 만료되었어요. 다시 로그인해주세요.',
  TOKEN_INVALID: '로그인 세션이 유효하지 않아요. 다시 로그인해주세요.',

  // 서버 내부적인 에러로 예측 불가
  INTERNAL_SERVER_ERROR: '서버가 원할하지 않아요. 잠시 후 다시 시도해주세요.',

  // OAuth2 로그인 에러 - Next.js API Routes
  EMPTY_USER_EMAIL: '이메일 정보를 찾을 수 없어 로그아웃 됐어요. 다시 로그인해주세요.',
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

  // 에디터 관련 에러
  INVALID_LINK_PROTOCOL: '허용되지 않은 프로토콜이에요. https://로 시작하는 링크를 입력해주세요.',
  INVALID_LINK_URL: '허용되지 않은 링크예요. www.example.com과 같은 링크를 입력해주세요.',
  MAX_SIZE_EXCEEDED: '이미지 크기가 너무 커요. 최대 5MB 이하의 이미지를 업로드해주세요.',
  UPLOAD_FAILED: '이미지 업로드에 실패했어요. 다시 시도해주세요.',
  NO_IMAGE_SELECTED: '이미지를 선택해주세요.',
  TOO_MANY_IMAGES_SELECTED: '이미지는 1개만 선택할 수 있어요.',
  UPLOAD_CANCELLED: '이미지 업로드가 취소되었어요.',
} as const;
