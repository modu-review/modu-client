import {useSuspenseQuery} from '@tanstack/react-query';
import {notificationsOptions} from './query-service';

export function useGetNotifications() {
  return useSuspenseQuery(notificationsOptions.all);
}
