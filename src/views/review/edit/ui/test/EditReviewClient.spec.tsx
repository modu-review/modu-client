import {patchReview} from '@/entities/review/apis/api-service';
import {createReviewDetail, TEST_USER_NICKNAME} from './stub';
import {render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import EditReviewClient from '../EditReviewClient';
import {withAllContext} from '@/shared/lib/utils/withAllContext';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import {useUserNickname} from '@/entities/auth';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock/navigation'));
jest.mock('@/entities/review/apis/api-service');
jest.mock('@/entities/auth');

// https://stackoverflow.com/questions/68023284/react-testing-library-user-event-throws-error-typeerror-root-elementfrompoint/77219899#77219899
// Tiptap이 기반하고 있는 Prosemirror가 참조하는 레이아웃 정보를 jsdom에서 지원하지 않음.
// 해당 레이아웃 관련 정보를 stub 처리
function getBoundingClientRect(): DOMRect {
  const rec = {
    x: 0,
    y: 0,
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  };
  return {...rec, toJSON: () => rec};
}

class FakeDOMRectList extends Array<DOMRect> implements DOMRectList {
  item(index: number): DOMRect | null {
    return this[index];
  }
}

document.elementFromPoint = (): null => null;
HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;
HTMLElement.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();
Range.prototype.getBoundingClientRect = getBoundingClientRect;
Range.prototype.getClientRects = (): DOMRectList => new FakeDOMRectList();
window.scrollBy = jest.fn();

const mockPatchReview = patchReview as jest.MockedFunction<typeof patchReview>;
const mockUseUserNickname = useUserNickname as jest.MockedFunction<typeof useUserNickname>;

describe('src/views/review/edit/ui/EditReviewClient.tsx', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('통합 렌더링 테스트', () => {
    it('에디터 내에 초기 제목, 카테고리, 내용이 입력된채로 렌더링된다.', async () => {
      const initialReviewDetail = createReviewDetail({
        board_id: 5,
        title: '초기 제목',
        category: 'book',
        content: '<p>초기 내용</p>',
      });

      render(withAllContext(<EditReviewClient data={initialReviewDetail} reviewId={5} />));

      await waitForElementToBeRemoved(screen.getByText('에디터 정보를 불러오고 있어요.'));

      expect(screen.getByDisplayValue('초기 제목')).toBeInTheDocument();
      expect(screen.getByText('책', {selector: 'span'})).toBeInTheDocument();
      expect(screen.getByText('초기 내용')).toBeInTheDocument();
    });
  });

  describe('통합 테스트', () => {
    it('제목과 카테고리를 수정해 수정을 요청할 수 있다.', async () => {
      const user = userEvent.setup();

      const initialReviewDetail = createReviewDetail({
        board_id: 5,
        title: '',
        category: 'book',
        content: '<p>초기 내용</p>',
      });

      let resolvePatchReview: any;
      mockPatchReview.mockImplementation(() => {
        return new Promise(resolve => {
          resolvePatchReview = resolve;
        });
      });
      mockUseUserNickname.mockReturnValue(TEST_USER_NICKNAME);

      mockRouter.push('/');

      render(withAllContext(<EditReviewClient data={initialReviewDetail} reviewId={5} />));

      await waitForElementToBeRemoved(screen.getByText('에디터 정보를 불러오고 있어요.'));

      const categoryOptions = screen.getByRole('combobox');
      await user.click(categoryOptions);

      const foodOption = screen.getByRole('option', {name: '음식'});
      await user.click(foodOption);

      const titleInput = screen.getByPlaceholderText('제목을 입력하세요');
      await user.type(titleInput, ' 수정');

      const saveButton = screen.getByRole('button', {name: '저장하기'});
      await user.click(saveButton);

      await screen.findByText('리뷰를 저장하고 있어요.');

      resolvePatchReview();

      await waitFor(() => {
        expect(mockRouter.asPath).toBe('/reviews/5');
      });
    });
  });
});
