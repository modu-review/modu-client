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
  INVALID_INPUT: '올바르지 않은 입력이에요.',
} as const;

