import {NextResponse, NextRequest} from 'next/server';
import {tavily} from '@tavily/core';
import {validateQueryWithGroq} from './validateQueryWithGroq';

const CATEGORY_SUFFIX: Record<string, string> = {
  food: '맛 평가 양 가성비 솔직 후기 메뉴 추천',
  car: '시승기 승차감 연비 결함 장단점',
  cosmetic: '발색 지속력 제형 트러블 솔직 후기',
  clothes: '사이즈 팁 재질 핏 착샷 코디 후기',
  device: '스펙 발열 배터리 성능 장단점 개봉기',
  book: '책 서평 독후감 줄거리 요약 솔직 리뷰',
  sports: '착용감 내구력 효과 사용기 장단점',
  all: '솔직 후기 장점 단점 내돈내산 추천',
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const keyword = searchParams.get('keyword');
    const category = searchParams.get('category');

    if (!keyword) {
      return NextResponse.json(
        {
          title: 'SEARCH_KEYWORD_MISSING',
          detail: '검색 키워드가 제공되지 않았습니다. 다시 시도해주세요',
          status: 400,
        },
        {status: 400},
      );
    }

    if (!category) {
      return NextResponse.json(
        {
          title: 'SEARCH_CATEGORY_MISSING',
          detail: '검색 카테고리가 제공되지 않았습니다. 다시 시도해주세요',
          status: 400,
        },
        {status: 400},
      );
    }

    const validation = await validateQueryWithGroq({
      keyword,
      category,
      TIMEOUT_MS: 1200,
    });

    if (!validation.isValid) {
      return NextResponse.json({
        status: 'fail',
        summary: validation.message || '적절한 검색어가 아닌 것 같아요. 😅',
        sources: [],
      });
    }

    const tavilyApiKey = process.env.TAVILY_API_KEY;

    if (!tavilyApiKey) {
      return NextResponse.json(
        {
          title: 'TAVILY_API_KEY_MISSING',
          detail: '검색 기능 환경 변수가 누락됐습니다. 관리자에게 문의해주세요.',
          status: 500,
        },
        {status: 500},
      );
    }

    const suffix = CATEGORY_SUFFIX[category] || CATEGORY_SUFFIX['all'];
    const enhancedQuery = `"${keyword}" ${suffix}`;

    const client = tavily({apiKey: tavilyApiKey});

    const response = await client.search(enhancedQuery, {
      topic: 'general',
      searchDepth: 'basic',
      includeAnswer: 'advanced',
      includeImages: false,
      country: 'south korea',
      maxResults: 8,
    });

    return NextResponse.json({
      status: 'success',
      summary: response.answer,
      sources: response.results.map(item => ({
        title: item.title,
        url: item.url,
        snippet: item.content,
      })),
    });
  } catch (error) {
    console.error('AI 검색 에러:', error);

    return NextResponse.json(
      {
        title: 'SEARCH_FAILED',
        detail: '검색에 실패했어요. 잠시 후 다시 시도해주세요.',
        status: 500,
      },
      {status: 500},
    );
  }
}
