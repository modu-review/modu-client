// API 요청에 사용되는 메서드
type TMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API 요청에 사용되는 헤더 타입 ex) { 'Content-Type': 'application/json' }
type THeaders = Record<string, string>;

// API 요청에 사용되는 바디 타입 ex) { name: 'John Doe' }
type TBody = BodyInit | object | null;

// API 요청에 사용되는 쿼리 파라미터 타입 ex) { page: 1, limit: 10, search: 'John Doe', is_active: true }
type TQueryParams = Record<string, string | number | boolean>;

// API 요청에 사용되는 RequestInit 타입으로 기존 RequestInit에 method 프로퍼티를 TMethod로 강제
type RequestInitWithMethod = Omit<RequestInit, 'method'> & {method: TMethod};

type CreateRequestInitProps = {
  body?: TBody;
  method: TMethod;
  headers?: THeaders;
};

// API 요청에 사용되는 프로퍼티 타입
type RequestProps = {
  baseUrl?: string;
  endpoint: string;
  method: TMethod;
  headers?: THeaders;
  body?: TBody;
  queryParams?: TQueryParams;
  withResponse?: boolean;
};

type RequestMethodProps = Omit<RequestProps, 'method'>;

/**
 * @description fetch API의 두 번째 인자인 RequestInit 객체를 생성하는 함수
 * @param {CreateRequestInitProps} props - RequestInit 객체를 생성하는 데 필요한 프로퍼티 객체 (body, method, headers)
 * @returns {RequestInitWithMethod} - RequestInit 객체를 반환
 */
function createRequestInit({method, body, headers}: CreateRequestInitProps): RequestInitWithMethod {
  const requestInit: RequestInitWithMethod = {
    credentials: 'include',
    method,
  };

  if (body instanceof FormData) {
    return {...requestInit, body};
  } else {
    return {
      ...requestInit,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    };
  }
}

/**
 * @description API 요청을 위한 URL과 RequestInit 객체를 생성하는 함수
 * @param {RequestProps} props - API 요청을 위한 프로퍼티 객체 (baseUrl, endpoint, method, headers, body, queryParams)
 * @returns {Object} - URL과 RequestInit 객체를 반환
 */
function prepareRequest({baseUrl, endpoint, method, headers, body, queryParams}: RequestProps): {
  url: string;
  requestInit: RequestInitWithMethod;
} {
  let url = `${baseUrl}${endpoint}`;

  if (queryParams) {
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    url += `?${queryString}`;
  }

  const requestInit = createRequestInit({method, body, headers});

  return {url, requestInit};
}

/**
 * @description API 요청을 보내는 함수
 * @param {RequestProps} props - API 요청을 위한 프로퍼티 객체 (baseUrl, endpoint, method, headers, body, queryParams)
 * @returns {Promise<T>} - API 응답을 반환하는 Promise 객체
 */
async function request<T>(props: RequestProps): Promise<T> {
  const {url, requestInit} = prepareRequest(props);

  const response: Response = await fetch(url, requestInit);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  if (props.withResponse) {
    return await response.json();
  }

  return undefined as T;
}

/**
 * @description GET 메서드로 API 요청을 보내는 함수
 * @param {RequestMethodProps} props - API 요청을 위한 프로퍼티 객체 (baseUrl, endpoint, headers, queryParams)
 * @returns {Promise<T>} - API 응답을 반환하는 Promise 객체
 */
export async function requestGet<T>({headers = {}, ...args}: RequestMethodProps): Promise<T> {
  return request<T>({
    ...args,
    method: 'GET',
    headers,
    withResponse: true,
  });
}

/**
 * @description POST 메서드로 API 요청을 보내는 함수
 * @param {RequestMethodProps} props - API 요청을 위한 프로퍼티 객체 (baseUrl, endpoint, headers, body)
 * @returns {Promise<T>} - API 응답을 반환하는 Promise 객체
 */
export async function requestPost<T = void>({
  headers = {},
  withResponse = false,
  ...args
}: RequestMethodProps): Promise<T> {
  return request<T>({
    ...args,
    method: 'POST',
    headers,
    withResponse,
  });
}

/**
 * @description PUT 메서드로 API 요청을 보내는 함수
 * @param {RequestMethodProps} props - API 요청을 위한 프로퍼티 객체 (baseUrl, endpoint, headers, body)
 * @returns {Promise<T>} - API 응답을 반환하는 Promise 객체
 */
export async function requestPut<T = void>({
  headers = {},
  withResponse = false,
  ...args
}: RequestMethodProps): Promise<T> {
  return request<T>({
    ...args,
    method: 'PUT',
    headers,
    withResponse,
  });
}

/**
 * @description DELETE 메서드로 API 요청을 보내는 함수
 * @param {RequestMethodProps} props - API 요청을 위한 프로퍼티 객체 (baseUrl, endpoint, headers)
 * @returns {Promise<T>} - API 응답을 반환하는 Promise 객체
 */
export async function requestDelete<T = void>({
  headers = {},
  withResponse = false,
  ...args
}: RequestMethodProps): Promise<T> {
  return request<T>({
    ...args,
    method: 'DELETE',
    headers,
    withResponse,
  });
}

/**
 * @description PATCH 메서드로 API 요청을 보내는 함수
 * @param {RequestMethodProps} props - API 요청을 위한 프로퍼티 객체 (baseUrl, endpoint, headers, body)
 * @returns {Promise<T>} - API 응답을 반환하는 Promise 객체
 */
export async function requestPatch<T = void>({
  headers = {},
  withResponse = false,
  ...args
}: RequestMethodProps): Promise<T> {
  return request<T>({
    ...args,
    method: 'PATCH',
    headers,
    withResponse,
  });
}
