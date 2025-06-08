import {BestReviewsResult, CateogyReviewsResult, KeywordReviewsResult} from '../model/types';
import {requestGet} from '@/shared/apis';

export function getBestReviews() {
  return requestGet<BestReviewsResult>({
    endpoint: '/reviews/best',
  });
}

export function getReviewsWithKeyword(keyword: string, page: number, sort: string) {
  return requestGet<KeywordReviewsResult>({
    endpoint: '/search',
    queryParams: {
      keyword: keyword,
      page: page,
      sort: sort,
    },
  });
}

export function getReviews(cursor: number, categoryId: string, sort: string) {
  return requestGet<CateogyReviewsResult>({
    endpoint: `/reviews`, // TODO: 실제 api들어오면 /api 빼기
    queryParams: {
      categoryId: categoryId,
      cursor: cursor,
      sort: sort,
    },
  });
}
