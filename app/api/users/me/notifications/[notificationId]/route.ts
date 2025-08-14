import {Notification, Notifications} from '@/entities/notifications';
import {readFileSync, writeFileSync} from 'fs';
import {NextRequest, NextResponse} from 'next/server';
import path from 'path';

type Props = {
  params: Promise<{notificationId: number}>;
};

export async function PATCH(req: NextRequest, {params}: Props) {
  const {notificationId} = await params;

  const filePath = path.join(process.cwd(), 'public/data', 'notifications.json');
  const fileData = readFileSync(filePath, 'utf-8');

  const notificationData: Notifications = JSON.parse(fileData);
  const requestBody = await req.json();

  const updatedNotifications = notificationData.results.map((notification: Notification) => {
    if (notification.id === Number(notificationId)) {
      const newNotification = Object.assign(notification, requestBody);

      return newNotification;
    }

    return notification;
  });

  writeFileSync(filePath, JSON.stringify(Object.assign(notificationData, {results: updatedNotifications}), null, 2));

  return NextResponse.json({message: '성공!'});
}
