'use client';

import {Notification, useDeleteNotification, useMarkNotificationAsRead} from '@/entities/notifications';
import {LucideIcon} from '@/shared/ui/icons';
import {useRouter} from 'next/navigation';

type Props = {
  notification: Notification;
};

const NOTIFICATION_CONFIG = {
  comment: {
    icon: 'MessageCircle' as const,
    bgColor: 'bg-red-300',
    title: '누군가 댓글을 남겼어요.',
    getMessage: (title: string) => `'${title}' 게시글에 댓글을 남겼어요!`,
  },
  bookmark: {
    icon: 'Bookmark' as const,
    bgColor: 'bg-black',
    title: '누군가 게시글을 저장했어요.',
    getMessage: (title: string) => `'${title}' 게시글을 저장했어요!`,
  },
} as const;

export default function NotificationCard({notification}: Props) {
  const {id, board_id, isRead, title, created_at, type} = notification;
  const config = NOTIFICATION_CONFIG[type];

  const router = useRouter();

  const {markNotificationAsRead} = useMarkNotificationAsRead();
  const {deleteNotification, isPending: isPendingDelete} = useDeleteNotification();

  const handleMarkAsRead = () => {
    router.push(`/reviews/${board_id}`);

    if (!isRead) {
      markNotificationAsRead({notificationId: id, boardId: board_id});
    }
  };

  const handleDeleteNotification = () => {
    deleteNotification({notificationId: id, boardId: board_id});
  };

  return (
    <>
      <button
        className={`w-full text-left flex items-center border-b-2 border-neutral-300 ${notification.isRead ? 'bg-gray-200' : 'bg-white'} py-5 px-3 md:px-5 pb-8 md:pb-6 hover:bg-gray-100 transition-colors`}
        onClick={handleMarkAsRead}
        aria-label={`${config.title} - ${config.getMessage(title)} 게시글로 이동`}
        disabled={isPendingDelete}
      >
        <div className={`${config.bgColor} p-2 md:p-2 rounded-lg mr-3 md:mr-3`}>
          <LucideIcon name={config.icon} className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
        <div className="flex flex-col flex-1 md:flex-[0.75]">
          <p className="font-semibold">{config.title}</p>
          <p className="text-[13px] md:text-sm text-muted-foreground">{config.getMessage(title)}</p>
        </div>
        <p className="absolute right-3 bottom-2 md:static text-[12px] md:text-sm font-semibold flex-[0.2] whitespace-nowrap">
          {created_at}
        </p>
      </button>
      <button
        className="absolute top-2 md:inset-y-0 md:translate-y-[-4%] right-1 md:right-3"
        onClick={handleDeleteNotification}
        disabled={isPendingDelete}
        aria-label={`${config.title} - ${config.getMessage(title)} 알림 삭제`}
      >
        <LucideIcon name="X" className="w-5 h-5 md:w-5 md:h-5 text-gray-500 hover:text-gray-700" />
      </button>
    </>
  );
}
