import {getNotifications} from '../apis/api-service';

export const notificationsKeys = {
  all: ['notifications'] as const,
};

export const notificationsOptions = {
  all: {
    queryKey: notificationsKeys.all,
    queryFn: getNotifications,
  },
};
