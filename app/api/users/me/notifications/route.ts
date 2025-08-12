import {Notification} from '@/entities/notifications';
import {readFileSync} from 'fs';
import {NextResponse} from 'next/server';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public/data', 'notifications.json');

  const fileData = readFileSync(filePath, 'utf-8');
  const notificationData: Notification[] = JSON.parse(fileData);

  const notifications = notificationData.filter(notification => !notification.isDelete);

  return NextResponse.json(notifications);
}
