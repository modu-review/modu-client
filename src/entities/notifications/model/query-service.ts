import {getNotifications} from '../apis/api-service';

export const notificationsKeys = {
  all: ['notifications'] as const,

  page: (page: number) => [...notificationsKeys.all, page] as const,
};

export const notificationsOptions = {
  page: (page: number) => ({
    queryKey: notificationsKeys.page(page),
    queryFn: () => getNotifications(page),
  }),
};
