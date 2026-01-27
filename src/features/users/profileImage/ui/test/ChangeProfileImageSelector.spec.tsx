import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChangeProfileImageSelector from '../ChangeProfileImageSelector';
import {useUpdateGlobalError} from '@/entities/error';
import {createClientError} from '@/shared/lib/utils/client-error';

jest.mock('@/entities/error', () => ({
  useUpdateGlobalError: jest.fn(),
}));

jest.mock('@/shared/lib/utils/client-error', () => ({
  createClientError: jest.fn((name: string) => ({name})),
}));

let mockDraggedFile: File | null = null;

jest.mock('@/shared/ui/components', () => ({
  ImageUploadDragArea: ({onFile, onError, children}: any) => (
    <div data-testid="image-upload-drag-area">
      <button
        type="button"
        onClick={() => {
          if (mockDraggedFile) {
            onFile(mockDraggedFile);
          } else {
            onError({name: 'NO_IMAGE_SELECTED'});
          }
        }}
      >
        드롭 시뮬레이션
      </button>
      {children}
    </div>
  ),
}));

jest.mock('@/shared/ui/icons', () => ({
  LucideIcon: () => <span data-testid="lucide-icon" />,
}));

const mockUseUpdateGlobalError = useUpdateGlobalError as jest.MockedFunction<typeof useUpdateGlobalError>;
const mockCreateClientError = createClientError as jest.MockedFunction<typeof createClientError>;

describe('features/users/profileImage/ui/ChangeProfileImageSelector', () => {
  const mockUpdateGlobalError = jest.fn();
  const mockOnSelectFile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockDraggedFile = null;

    mockUseUpdateGlobalError.mockReturnValue(mockUpdateGlobalError);
  });

  it('허용된 형식과 크기의 파일을 고르면 선택 콜백이 호출된다', async () => {
    const user = userEvent.setup();
    const validFile = new File(['image'], 'profile.png', {type: 'image/png'});

    render(<ChangeProfileImageSelector onSelectFile={mockOnSelectFile} />);

    const input = screen.getByLabelText(/사진을 드래그하거나 클릭해 업로드할 수 있어요\./i);
    await user.upload(input, validFile);

    expect(mockOnSelectFile).toHaveBeenCalledWith(validFile);
    expect(mockUpdateGlobalError).not.toHaveBeenCalled();
  });

  it('지원하지 않는 형식의 파일을 고르면 전역 에러가 갱신되고 선택 콜백은 호출되지 않는다', () => {
    const invalidTypeFile = new File(['image'], 'profile.gif', {type: 'image/gif'});

    render(<ChangeProfileImageSelector onSelectFile={mockOnSelectFile} />);

    const input = screen.getByLabelText(/사진을 드래그하거나 클릭해 업로드할 수 있어요\./i);
    fireEvent.change(input, {target: {files: [invalidTypeFile]}});

    expect(mockCreateClientError).toHaveBeenCalledWith('NOT_SUPPORTED_FILE');
    expect(mockUpdateGlobalError).toHaveBeenCalledWith({name: 'NOT_SUPPORTED_FILE'});
    expect(mockOnSelectFile).not.toHaveBeenCalled();
  });

  it('허용된 형식이어도 크기 제한을 넘으면 전역 에러가 갱신되고 선택 콜백은 호출되지 않는다', () => {
    const oversizedFile = new File(['image'], 'large.png', {type: 'image/png'});
    Object.defineProperty(oversizedFile, 'size', {
      configurable: true,
      value: 6 * 1024 * 1024,
    });

    render(<ChangeProfileImageSelector onSelectFile={mockOnSelectFile} />);

    const input = screen.getByLabelText(/사진을 드래그하거나 클릭해 업로드할 수 있어요\./i);
    fireEvent.change(input, {target: {files: [oversizedFile]}});

    expect(mockCreateClientError).toHaveBeenCalledWith('FILE_SIZE_EXCEEDED');
    expect(mockUpdateGlobalError).toHaveBeenCalledWith({name: 'FILE_SIZE_EXCEEDED'});
    expect(mockOnSelectFile).not.toHaveBeenCalled();
  });

  it('드래그 영역으로 유효한 파일을 떨어뜨리면 선택 콜백이 호출된다', async () => {
    const user = userEvent.setup();
    const droppedFile = new File(['image'], 'drop.png', {type: 'image/png'});
    mockDraggedFile = droppedFile;

    render(<ChangeProfileImageSelector onSelectFile={mockOnSelectFile} />);

    await user.click(screen.getByRole('button', {name: '드롭 시뮬레이션'}));

    expect(mockOnSelectFile).toHaveBeenCalledWith(droppedFile);
    expect(mockUpdateGlobalError).not.toHaveBeenCalled();
  });
});
