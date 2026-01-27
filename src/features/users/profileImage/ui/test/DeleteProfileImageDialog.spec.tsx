import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteProfileImageDialog from '../DeleteProfileImageDialog';
import {NO_PROFILE_IMAGE_URL, useDeleteProfileImage, useGetProfileImageByUserNickname} from '@/entities/users';

jest.mock('@/entities/users', () => ({
  NO_PROFILE_IMAGE_URL: 'https://example.com/default.png',
  useDeleteProfileImage: jest.fn(),
  useGetProfileImageByUserNickname: jest.fn(),
}));

jest.mock('@/shared/shadcnComponent/ui/dialog', () => ({
  Dialog: ({children}: any) => <div data-testid="dialog-root">{children}</div>,
  DialogTrigger: ({children, ...props}: any) => (
    <button type="button" {...props}>
      {children}
    </button>
  ),
  DialogContent: ({children}: any) => <div data-testid="dialog-content">{children}</div>,
  DialogHeader: ({children}: any) => <div>{children}</div>,
  DialogTitle: ({children}: any) => <div>{children}</div>,
  DialogDescription: ({children}: any) => <div>{children}</div>,
  DialogFooter: ({children}: any) => <div>{children}</div>,
  DialogClose: ({children}: any) => <>{children}</>,
}));

jest.mock('@/shared/ui/icons', () => ({
  LucideIcon: () => <span data-testid="lucide-icon" />,
}));

jest.mock('@radix-ui/react-popover', () => ({
  PopoverClose: ({children}: any) => <>{children}</>,
}));

const mockUseDeleteProfileImage = useDeleteProfileImage as jest.MockedFunction<typeof useDeleteProfileImage>;
const mockUseGetProfileImageByUserNickname =
  useGetProfileImageByUserNickname as jest.MockedFunction<typeof useGetProfileImageByUserNickname>;

describe('features/users/profileImage/ui/DeleteProfileImageDialog', () => {
  const mockDeleteProfileImage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseDeleteProfileImage.mockReturnValue({
      deleteProfileImage: mockDeleteProfileImage,
    } as any);

    mockUseGetProfileImageByUserNickname.mockReturnValue({
      data: {profileImage: 'https://example.com/custom.png'},
    } as any);
  });

  it('기본 프로필 이미지인 경우 삭제 기능이 노출되지 않는다', () => {
    mockUseGetProfileImageByUserNickname.mockReturnValue({
      data: {profileImage: NO_PROFILE_IMAGE_URL},
    } as any);

    render(<DeleteProfileImageDialog userNickname="tester" />);

    expect(screen.queryByRole('button', {name: '삭제'})).not.toBeInTheDocument();
    expect(mockDeleteProfileImage).not.toHaveBeenCalled();
  });

  it('사용자 프로필 이미지가 존재하면 삭제 동작이 사용자 정보와 함께 호출된다', async () => {
    const user = userEvent.setup();

    render(<DeleteProfileImageDialog userNickname="tester" />);

    const deleteButton = screen.getByRole('button', {name: '프로필 이미지 삭제'});
    await user.click(deleteButton);

    expect(mockDeleteProfileImage).toHaveBeenCalledWith({userNickname: 'tester'});
  });
});
