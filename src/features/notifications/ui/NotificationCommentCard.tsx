import {Notification} from '@/entities/notifications';

type Props = {
  notification: Omit<Notification, 'type'>;
};

export default function NotificationCommentCard({notification}: Props) {
  return <article></article>;
}
