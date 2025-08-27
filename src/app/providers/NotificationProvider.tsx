'use client';

import {useCallback} from 'react';
import {MetaEvent, NotificationEvent, useConnectSSE, useSetHasNotifications} from '@/entities/notifications';

type Props = {
  children: React.ReactNode;
};

export default function NotificationProvider({children}: Props) {
  const setHasNotification = useSetHasNotifications();

  const handleMeta = useCallback((data: MetaEvent) => {
    setHasNotification(data.hasNotification);
  }, []);

  const handleNotification = useCallback((data: NotificationEvent) => {
    setHasNotification(true);
    // TODO: 토스트 처리
  }, []);

  useConnectSSE({
    onMeta: handleMeta,
    onNotification: handleNotification,
  });

  return children;
}
