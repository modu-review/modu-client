import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChangeProfileImageDialog from '../ChangeProfileImageDialog';
import {useChangeProfileImage} from '../../lib/useChangeProfileImage';

jest.mock('../../lib/useChangeProfileImage', () => ({
  useChangeProfileImage: jest.fn(),
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
}));

jest.mock('@/shared/ui/icons', () => ({
  LucideIcon: () => <span data-testid="lucide-icon" />,
}));

const mockSelectorFile = new File(['image'], 'profile.png', {type: 'image/png'});

jest.mock('../ChangeProfileImageSelector', () => ({
  __esModule: true,
  default: ({onSelectFile}: any) => (
    <div data-testid="change-profile-image-selector">
      <button type="button" onClick={() => onSelectFile(mockSelectorFile)}>
        파일 선택 시뮬레이션
      </button>
    </div>
  ),
}));

jest.mock('../ChangeProfileImagePreview', () => ({
  __esModule: true,
  default: ({onSubmit, onCancel}: any) => (
    <div data-testid="change-profile-image-preview">
      <button type="button" onClick={onCancel}>
        다시 선택 시뮬레이션
      </button>
      <button type="button" onClick={onSubmit}>
        업로드 시뮬레이션
      </button>
    </div>
  ),
}));

const mockUseChangeProfileImage = useChangeProfileImage as jest.MockedFunction<typeof useChangeProfileImage>;

describe('features/users/profileImage/ui/ChangeProfileImageDialog', () => {
  const mockHandleSetFile = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockHandleCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseChangeProfileImage.mockReturnValue({
      profileImage: null,
      handleSetFile: mockHandleSetFile,
      handleSubmit: mockHandleSubmit,
      handleCancel: mockHandleCancel,
    });
  });

  it('선택된 이미지가 없으면 선택 영역이 노출되고 파일 선택 동작이 연결된다', async () => {
    const user = userEvent.setup();

    render(<ChangeProfileImageDialog />);

    expect(screen.getByTestId('change-profile-image-selector')).toBeInTheDocument();
    expect(screen.queryByTestId('change-profile-image-preview')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: '파일 선택 시뮬레이션'}));

    expect(mockHandleSetFile).toHaveBeenCalledWith(mockSelectorFile);
  });

  it('선택된 이미지가 있으면 미리보기 영역이 노출되고 업로드와 취소 동작이 연결된다', async () => {
    const user = userEvent.setup();

    mockUseChangeProfileImage.mockReturnValue({
      profileImage: {file: mockSelectorFile, url: 'blob:preview-url'},
      handleSetFile: mockHandleSetFile,
      handleSubmit: mockHandleSubmit,
      handleCancel: mockHandleCancel,
    });

    render(<ChangeProfileImageDialog />);

    expect(screen.getByTestId('change-profile-image-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('change-profile-image-selector')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: '업로드 시뮬레이션'}));
    await user.click(screen.getByRole('button', {name: '다시 선택 시뮬레이션'}));

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleCancel).toHaveBeenCalledTimes(1);
  });
});
