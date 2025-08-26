import {useCallback, useEffect, useRef} from 'react';
import {preflightNotifications} from '../apis/api-service';
import {useIsLoggedIn} from '@/entities/auth';
import {tokenRefresh} from '@/entities/auth/apis/api-service';
import {useUpdateGlobalError} from '@/entities/error';
import {RequestError} from '@/shared/apis/request-error';
import {TErrorInfo} from '@/shared/apis/request-type';

export function useConnectSSE() {
  const eventSourceRef = useRef<EventSource | null>(null);

  const isLoggedIn = useIsLoggedIn();
  const updateGlobalError = useUpdateGlobalError();

  const initializeEventSource = useCallback(() => {
    const newEventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/notifications/stream`, {
      withCredentials: true,
    });

    newEventSource.onmessage = event => {
      console.log('메세지 이벤트 발생', event);
    };

    newEventSource.onerror = event => {
      console.error('에러 이벤트 발생', event);

      newEventSource.close();
    };

    eventSourceRef.current = newEventSource;
  }, []);

  const connectSSE = useCallback(async () => {
    if (eventSourceRef.current) return;

    try {
      const preflightResponse = await preflightNotifications();

      if (preflightResponse.ok) {
        initializeEventSource();
        return;
      }

      if (preflightResponse.status === 401) {
        const tokenRefreshResponse = await tokenRefresh();

        if (tokenRefreshResponse.ok) {
          initializeEventSource();
          return;
        }

        throw new RequestError({
          name: 'TOKEN_EXPIRED',
          message: '로그인 세션이 만료되었습니다.',
          status: 401,
          endpoint: tokenRefreshResponse.url,
          method: 'GET',
          requestBody: null,
        });
      }

      const {title, detail, status}: TErrorInfo = await preflightResponse.json();
      throw new RequestError({
        name: title,
        message: detail,
        status,
        endpoint: preflightResponse.url,
        method: 'GET',
        requestBody: null,
      });
    } catch (error) {
      if (error instanceof RequestError) {
        updateGlobalError(error);
        return;
      }

      throw error;
    }
  }, [initializeEventSource, updateGlobalError]);

  useEffect(() => {
    if (isLoggedIn) {
      connectSSE();
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [isLoggedIn, connectSSE]);
}
