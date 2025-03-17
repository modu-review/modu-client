// API 요청에 사용되는 메서드
export type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API 요청에 사용되는 헤더 타입 ex) { 'Content-Type': 'application/json' }
export type THeaders = Record<string, string>;

// API 요청에 사용되는 바디 타입 ex) { name: 'John Doe' }
export type TBody = BodyInit | object | null;

// API 요청에 사용되는 쿼리 파라미터 타입 ex) { page: 1, limit: 10, search: 'John Doe', is_active: true }
export type TQueryParams = Record<string, string | number | boolean>;

// API 요청에 사용되는 RequestInit 타입으로 기존 RequestInit에 method 프로퍼티를 TMethod로 강제
export type RequestInitWithMethod = Omit<RequestInit, 'method'> & {method: TMethod};

export type CreateRequestInitProps = {
  body?: TBody;
  method: TMethod;
  headers?: THeaders;
};

// API 요청에 사용되는 프로퍼티 타입
export type RequestProps = {
  baseUrl?: string;
  endpoint: string;
  method: TMethod;
  headers?: THeaders;
  body?: TBody;
  queryParams?: TQueryParams;
  withResponse?: boolean;
};

export type RequestMethodProps = Omit<RequestProps, 'method'>;

// API 요청 중 발생하는 에러 객체 타입
export type TRequestError = Error & {
  status: number;
  endpoint: string;
  method?: TMethod;
  requestBody: TBody;
  errorCode: string;
  message: string;
};
