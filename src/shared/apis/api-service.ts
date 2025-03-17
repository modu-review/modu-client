import {RequestError, RequestGetError} from './request-error';
import {
  CreateErrorProps,
  CreateRequestInitProps,
  RequestInitWithMethod,
  RequestMethodProps,
  RequestProps,
  TErrorInfo,
  WithErrorHandling,
} from './request-type';

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
 * @description API 요청 중 발생한 에러를 처리하는 함수
 * @param {WithErrorHandling<CreateErrorProps>} props - API 요청 중 발생한 에러를 처리하는 데 필요한 프로퍼티 객체 (response, body, requestInit, errorHandlingType)
 * @returns {Promise<RequestError | RequestGetError>} - API 요청 중 발생한 에러 객체를 반환하는 Promise 객체
 */
async function handleRequestError({
  response,
  body,
  requestInit,
  errorHandlingType,
}: WithErrorHandling<CreateErrorProps>): Promise<RequestError | RequestGetError> {
  const {errorCode, message}: TErrorInfo = await response.json();

  if (requestInit.method === 'GET') {
    return new RequestGetError({
      status: response.status,
      requestBody: body,
      endpoint: response.url,
      name: errorCode,
      method: requestInit.method,
      errorCode,
      message,
      errorHandlingType,
    });
  }

  return new RequestError({
    status: response.status,
    requestBody: body,
    endpoint: response.url,
    name: errorCode,
    method: requestInit.method,
    errorCode,
    message,
  });
}

/**
 * @description API 요청을 보내는 함수
 * @param {RequestProps} props - API 요청을 위한 프로퍼티 객체 (baseUrl, endpoint, method, headers, body, queryParams)
 * @returns {Promise<T>} - API 응답을 반환하는 Promise 객체
 */
async function request<T>(props: WithErrorHandling<RequestProps>): Promise<T> {
  const {url, requestInit} = prepareRequest(props);

  const response: Response = await fetch(url, requestInit);

  if (!response.ok) {
    throw await handleRequestError({
      response,
      body: requestInit.body ? JSON.stringify(requestInit.body) : null,
      requestInit,
      errorHandlingType: props.errorHandlingType,
    });
  }

  if (props.withResponse) {
    return await response.json();
  }

  return undefined as T;
}

/**
 * @description GET 메서드로 API 요청을 보내는 함수
 * @param {RequestMethodProps} props - API 요청을 위한 프로퍼티 객체 (baseUrl, endpoint, headers, errorHandlingType)
 * @returns {Promise<T>} - API 응답을 반환하는 Promise 객체
 */
export async function requestGet<T>({
  headers = {},
  errorHandlingType,
  ...args
}: WithErrorHandling<RequestMethodProps>): Promise<T> {
  return request<T>({
    ...args,
    method: 'GET',
    headers,
    withResponse: true,
    errorHandlingType,
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
