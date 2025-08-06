type ErrorMessage = Record<string, string>;

export const SERVER_ERROR_MESSAGE: ErrorMessage = {
  // OAuth2 로그인 에러 - Next.js API Routes
  EMPTY_USER_EMAIL: '이메일 정보를 찾을 수 없어 로그아웃 됐어요. 다시 로그인해주세요.',

  // 슬랙 메세지 전송 에러
  SLACK_MESSAGE_SEND_ERROR: '슬랙 메세지 전송에 실패했어요. 다시 시도해주세요.',
  MISSING_REQUIRED_FIELDS: '이름, 이메일, 메시지 필드가 모두 필요해요.',
  SLACK_WEBHOOK_URL_NOT_SET: '슬랙 웹훅 URL이 설정되지 않았어요. 관리자에게 문의해주세요.',

  // 공통
  FORBIDDEN: '접근 권한이 없어요. 관리자에게 문의해주세요.',

  // 로그인 에러 GET /users/login
  UNAUTHORIZED: '로그인이 필요한 서비스에요. 다시 로그인해주세요.',

  // 로그아웃 에러 GET /users/logout

  /**
   * 후기 조회 관련
   * 베스트 후기 조회 GET /reviews/best
   * 카테고리 후기 조회 GET /reviews/categoryId={categoryId}
   * 키워드 후기 조회 GET /search/keyword={keyword}
   */
  JSON_PROCESSING_ERROR: '서버에서 데이터를 처리하는 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
  BOARD_SEARCH_KEYWORD_NOT_FOUND: '해당 키워드에 대한 후기를 찾을 수 없어요. 다른 키워드로 다시 검색해주세요.',

  /**
   * 후기 상세 조회 관련
   * 상세 조회 GET /reviews/{reviewId}
   * 댓글 조회 GET /reviews/{reviewId}/comments
   * 북마크 조회 GET /reviews/{reviewId}/bookmarks
   */
  BOARD_ID_NOT_FOUND: '해당 후기를 찾을 수 없어요. 후기가 삭제되었거나 존재하지 않을 수 있어요.',
  BOARD_NOT_EXIST: '해당 후기를 찾을 수 없어요. 후기가 삭제되었거나 존재하지 않을 수 있어요.',
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
