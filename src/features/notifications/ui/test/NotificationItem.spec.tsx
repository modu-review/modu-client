import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import {readNotificationStub, unReadNotificationStub} from './stub';
import NotificationItem from '../NotificationItem';
import {NOTIFICATION_CONFIG} from '../config/notification-config';

const mockMarkNotificationAsRead = jest.fn();

jest.mock('next/navigation', () => require('next-router-mock/navigation'));
jest.mock('@/entities/notifications', () => ({
  useMarkNotificationAsRead: () => ({markNotificationAsRead: mockMarkNotificationAsRead}),
}));

describe('src/features/notifications/ui/NotificationItem.tsx', () => {
  beforeEach(() => {
    mockMarkNotificationAsRead.mockReset();
  });

  it('컴포넌트가 렌더링된다.', () => {
    const notification = unReadNotificationStub;
    const config = NOTIFICATION_CONFIG[notification.type];
    const ariaLabel = `${config.title} - ${config.getMessage(notification.title)} 게시글로 이동`;

    render(<NotificationItem notification={notification} />);

    expect(screen.getByLabelText(ariaLabel, {selector: 'button'})).toBeInTheDocument();
    expect(screen.getByText(config.title)).toBeInTheDocument();
    expect(screen.getByText(config.getMessage(notification.title))).toBeInTheDocument();
    expect(screen.getByText(notification.created_at));
  });

  it('알림을 클릭하면 해당 게시글로 이동한다.', async () => {
    const user = userEvent.setup();

    const notification = unReadNotificationStub;
    const config = NOTIFICATION_CONFIG[notification.type];
    const ariaLabel = `${config.title} - ${config.getMessage(notification.title)} 게시글로 이동`;

    render(<NotificationItem notification={notification} />);

    const button = screen.getByLabelText(ariaLabel, {selector: 'button'});

    await user.click(button);
    expect(mockRouter.asPath).toBe(`/reviews/${notification.board_id}`);
  });

  it('읽지 않은 알림을 클릭하면 읽음 처리한다.', async () => {
    const user = userEvent.setup();

    const notification = unReadNotificationStub;
    const config = NOTIFICATION_CONFIG[notification.type];
    const ariaLabel = `${config.title} - ${config.getMessage(notification.title)} 게시글로 이동`;

    render(<NotificationItem notification={notification} />);

    const button = screen.getByLabelText(ariaLabel, {selector: 'button'});

    await user.click(button);

    expect(mockMarkNotificationAsRead).toHaveBeenCalledTimes(1);
    expect(mockMarkNotificationAsRead).toHaveBeenCalledWith(notification.id);
  });

  it('이미 읽은 알림을 클릭하면 읽음 처리하지 않는다.', async () => {
    const user = userEvent.setup();

    const notification = readNotificationStub;
    const config = NOTIFICATION_CONFIG[notification.type];
    const ariaLabel = `${config.title} - ${config.getMessage(notification.title)} 게시글로 이동`;

    render(<NotificationItem notification={notification} />);

    const button = screen.getByLabelText(ariaLabel, {selector: 'button'});

    await user.click(button);

    expect(mockMarkNotificationAsRead).toHaveBeenCalledTimes(0);
  });
});
