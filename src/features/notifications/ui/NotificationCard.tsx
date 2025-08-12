import {Notification} from '@/entities/notifications';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  notification: Notification;
};

const NOTIFICATION_CONFIG = {
  comment: {
    icon: 'MessageCircle' as const,
    bgColor: 'bg-red-300',
    title: '누군가 댓글을 남겼습니다.',
    getMessage: (title: string) => `'${title}' 게시글에 댓글을 남겼어요!`,
  },
  bookmark: {
    icon: 'Bookmark' as const,
    bgColor: 'bg-black',
    title: '누군가 당신의 게시글을 저장했어요.',
    getMessage: (title: string) => `'${title}' 게시글을 저장했어요!`,
  },
} as const;

export default function NotificationCard({notification}: Props) {
  const {id, board_id, isRead, title, created_at, type} = notification;
  const config = NOTIFICATION_CONFIG[type];

  return (
    <article className="flex items-center justify-between">
      <div className={`${config.bgColor} p-2 rounded-lg mr-1`}>
        <LucideIcon name={config.icon} className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col flex-[0.75]">
        <p className="font-semibold">{config.title}</p>
        <p className="text-sm text-muted-foreground">{config.getMessage(title)}</p>
      </div>
      <p className="text-sm font-semibold flex-[0.2]">{created_at}</p>
      {/* TODO: 알림 삭제 기능 연결 */}
      <button>
        <LucideIcon name="X" className="w-5 h-5 text-gray-500 hover:text-gray-700" />
      </button>
    </article>
  );
}
