import {renderHook, act} from '@testing-library/react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useSelectCategoryFromUrl} from '../useSelectCategoryFromUrl';

jest.mock('next/navigation');

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;

describe('features/reviews/filtering/lib/useSelectCategoryFromUrl', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
    } as any);
  });

  describe('정상 케이스', () => {
    it('주소창에 유효한 카테고리가 있으면 해당 카테고리를 선택한다', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue('food'),
      } as any);

      const {result} = renderHook(() => useSelectCategoryFromUrl());

      expect(result.current.selectedCategory).toBe('food');
    });

    it('카테고리를 선택하면 주소창이 업데이트된다', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue('all'),
      } as any);

      const {result} = renderHook(() => useSelectCategoryFromUrl());

      act(() => {
        result.current.handleSelectCategory('car');
      });

      expect(mockPush).toHaveBeenCalledWith('?categoryId=car');
    });

    it('여러 번 카테고리를 변경해도 정상적으로 동작한다', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue('all'),
      } as any);

      const {result} = renderHook(() => useSelectCategoryFromUrl());

      act(() => {
        result.current.handleSelectCategory('food');
      });
      expect(mockPush).toHaveBeenCalledWith('?categoryId=food');

      act(() => {
        result.current.handleSelectCategory('device');
      });
      expect(mockPush).toHaveBeenCalledWith('?categoryId=device');
    });
  });

  describe('엣지/예외 케이스', () => {
    it('주소창에 카테고리가 없으면 전체 카테고리가 선택된다', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue(null),
      } as any);

      const {result} = renderHook(() => useSelectCategoryFromUrl());

      expect(result.current.selectedCategory).toBe('all');
    });

    it('주소창에 유효하지 않은 카테고리가 있으면 전체 카테고리로 폴백된다', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue('invalid'),
      } as any);

      const {result} = renderHook(() => useSelectCategoryFromUrl());

      expect(result.current.selectedCategory).toBe('all');
    });

    it('빈 문자열이 전달되면 전체 카테고리로 폴백된다', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue(''),
      } as any);

      const {result} = renderHook(() => useSelectCategoryFromUrl());

      expect(result.current.selectedCategory).toBe('all');
    });

    it('대소문자가 다른 카테고리가 있으면 전체 카테고리로 폴백된다', () => {
      mockUseSearchParams.mockReturnValue({
        get: jest.fn().mockReturnValue('Food'),
      } as any);

      const {result} = renderHook(() => useSelectCategoryFromUrl());

      expect(result.current.selectedCategory).toBe('all');
    });
  });
});
