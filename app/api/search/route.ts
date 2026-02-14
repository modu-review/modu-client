import {NextResponse, NextRequest} from 'next/server';
import {tavily} from '@tavily/core';
import {validateQueryWithGroq} from './validateQueryWithGroq';
import {cookies} from 'next/headers';
import {getSearchLimitStatus} from '@/features/chatbot';

const MOCK_RESULT = {
  status: 'success',
  summary:
    '아이폰 17 Pro는 6.7인치 Super Retina XDR ProMotion 디스플레이와 120 Hz 가변 주사율을 갖춘 풀스크린 디자인에, 최대 밝기 3000 nits(일부 모델 2000 nits)까지 지원하고, A19 Pro 칩셋과 12 GB RAM을 결합해 고사양 게임·영상 편집·AI 작업에서도 부드러운 성능을 제공한다. 저장 용량은 128 GB, 256 GB, 512 GB, 1 TB 중 선택 가능하며, 카메라 시스템은 48 MP 메인·12 MP 초광각·12 MP 6배 광학 줌 텔레포토 렌즈로 구성돼 저조도에서도 디테일을 살린 사진과 8K 영상 촬영이 가능하다. 배터리는 약 4 250 mAh(동영상 재생 기준 31 시간) 용량을 갖추어 전작보다 약 10 % 이상 긴 사용 시간을 제공하고, USB‑C→라이트닝 케이블이 기본 포함돼 충전·데이터 전송이 빠르며, 실제 사용 시 고부하 작업에서도 발열이 이전 모델보다 감소해 온도 관리가 향상된 반면, 장시간 3D 게임이나 8K 스트리밍 시 여전히 손목에 닿는 약간의 열감이 느껴질 수 있다. 장점으로는 뛰어난 연산·그래픽 성능, 탁월한 화면 밝기·색 재현, 전문가 수준의 카메라, 긴 배터리 지속 시간, 그리고 프리미엄 디자인과 내구성을 꼽을 수 있으며, 단점은 프로 모델 특유의 무게 증가(기본형보다 무겁고 한 손 사용 시 부담감), 높은 가격대, 고사양 기능이 일반 사용자에게는 과잉일 수 있다는 점, 그리고 극한 부하 시 여전히 약간의 발열과 배터리 소모가 발생한다는 점이다. 언박싱에서는 매끈한 검정·은색·블루 등 색상 옵션이 들어있는 박스와 함께 본체, USB‑C‑라이트닝 케이블, 기본 문서가 포함되며, 별도 전원 어댑터는 제공되지 않아 사용자는 기존 어댑터를 활용하거나 별도로 구매해야 한다.',
  sources: [
    {
      title: '아이폰17 Pro vs 아이폰17 어떤 제품이 좋을까? (비교, 스펙 ...',
      url: 'https://inform-uwannaknow.tistory.com/entry/%EC%95%84%EC%9D%B4%ED%8F%B017-Pro-vs-%EC%95%84%EC%9D%B4%ED%8F%B017-%EC%96%B4%EB%96%A4-%EC%A0%9C%ED%92%88%EC%9D%B4-%EC%A2%8B%EC%9D%84%EA%B9%8C-%EB%B9%84%EA%B5%90-%EC%8A%A4%ED%8E%99-%EC%9E%A5%EB%8B%A8%EC%A0%90',
      snippet:
        '# 아이폰17 Pro vs 아이폰17 어떤 제품이 좋을까? 이번글에서는 아이폰 17, 아이폰 17 Pro 어떤 점이 개선되었는지 어떤 제품이 좋을지에 대해 알아보도록 하겠습니다. ## **아이폰 17 vs 아이폰 17 Pro 스펙비교**. | **항목** | **iPhone 17** | **iPhone 17 Pro** |. ### **이번 아이폰 17 vs 17 Pro 주목할만한 점**. * 이번 아이폰17 모델에서는 전반적인 각진형태를 유지시키면서 더 슬림하고 가벼운 디자인이라는 평이 많습니다. | **기능** | **iPhone 17** | **iPhone 17 Pro** |. #### **iPhone 17 Pro 장점**. iPhone 17 Pro의 경우 아이폰 모델 중에서도 제일 좋은 모델이니 성능에서는 말할 필요가 없지만 A19 Pro 칩셋과 12GB RAM 조합으로 고사양작업, 게임, 영상편집등에서도 아주 여유로운 성능을 제공합니다. 또 이번 아이폰 17 Pro에서는 카메라 디자인이 변경되었는데요. #### **iPhone 17 Pro 단점**. 또 17 Pro 제품이니만큼 더 많은 기능과 배터리성능을 담다 보니 기본형보다 무게감이 있고 일반 사용자들에게는 Pro급 카메라나 고사양칩이 과할 수 있다는 평이 있습니다. iPhone 17 Pro (블랙) 구경해 보러 가기. 이번에 출시된 아이폰 17 vs 17 Pro 차이점 및 스펙 비교분석을 해봤는데요.',
    },
    {
      title: '아이폰17 프로 언박싱 후기 & 스펙 완전 분석 - 네이버 블로그',
      url: 'https://m.blog.naver.com/PostView.naver?blogId=anne7715&logNo=224017192860',
      snippet:
        '아이폰17 프로의 핵심은 성능·디스플레이·카메라·배터리 네 가지로 정리할 수 있어요. ... 발열이 심한 작업에서도 안정적으로 성능을 유지해. 내부에',
    },
    {
      title: '아이폰17 프로 장단점 Top 3 및 후기 : 네이버 블로그',
      url: 'https://blog.naver.com/powertheone/224126104190?viewType=pc',
      snippet:
        '최대 밝기. 3000nits. 2000nits ; 배터리. 4,252mAh(동영상 31시간). 3582mAh(동영상 27시간) ; 저장용량. 256/512GB/1TB. 128/256/512GB/1TB ; 색상. 실버 /',
    },
    {
      title: 'How much better is the iPhone 17 Pro? Series Comparison ...',
      url: 'https://www.youtube.com/watch?v=iyR8zDqnIM4',
      snippet:
        '아이폰 17프로는 얼마나 좋아졌을까? 시리즈 비교테스트🌈디자인, 성능, 카메라, AI, 배터리, 발열\n오라잇 스튜디오 - Digital Shopping Guide\n609000 subscribers\n\n123468 views\n14 Oct 2025\n💌 [ 광안리 ]는 광고 안 받는 리뷰의 줄임말입니다\n💌 해당 영상의 광안리 리뷰 제품은 모두 직접 구매 후 촬영에 사용하였습니다\n\n얼마 전에 아이폰 17 시리즈가 출시 되었는데요.\n특히나 새롭게 변화된 아이폰 17 프로 디자인 때문에 아이폰 감성이 사라졌다 아니다로 많은 이슈가 되었죠?\n오히려 일반 모델 스펙이 좋아져서 기본형이 더 많은 인기를 끌기도 했고요.\n\n그래서 광안리에서 준비해 보았습니다.\n아이폰17 Pro와 이전 15, 16 Pro 3종의 성능을 꼼꼼하게 비교해 봤으니,\n실제로 아이폰17 Pro가 얼마나 달라졌는지, \n어떤 부분은 아쉬운지 자세히 알려드릴게요.\n그럼 지금부터 영상 정주행 고고씽!\n\n💌제품 3종(256GB, 8GB 기준)\n- 아이폰 17 Pro: 출시가 179만원\n- 아이폰 16 Pro: 출시가 170만원 \n- 아이폰 15 Pro: 출시가 170만원\n\n💌테스트 종류\n00:00 ① 선정 기준 및 소개\n② 외형비교 ▶ 00:22\n③ 성능 ▶ 04:18\n④ 속도 ▶ 05:15\n⑤ 카메라 ▶ 06:59\n⑥ AI ▶ 11:29\n⑦ 발열 ▶ 14:27\n⑧ 배터리 ▶ 14:59\n⑨ 총평 ▶ 16:48\n\n\n#아이폰 #아이폰17프로 #아이폰17 \n#아이폰16프로  #아이폰15프로 \n#광고안받는리뷰 #오라잇스튜디오\n133 comments\n',
    },
    {
      title: '아이폰17 프로 실사용 변화, 숫자 스펙과 다른 체감 요소',
      url: 'https://thessadang.com/tips/detail/%EC%95%84%EC%9D%B4%ED%8F%B017-%ED%94%84%EB%A1%9C-%EC%8B%A4%EC%82%AC%EC%9A%A9-%EB%B3%80%ED%99%94-%EC%88%AB%EC%9E%90-%EC%8A%A4%ED%8E%99%EA%B3%BC-%EB%8B%A4%EB%A5%B8-%EC%B2%B4%EA%B0%90-%EC%9A%94%EC%86%8C-1507',
      snippet:
        '손에 쥐었을 때의 밸런스, 눈이 편한 화면, 카메라 실패율 감소, 끊김 없는 전환, 발열·배터리 불편 감소에서 더 크게 느껴져요. 그리고 결정을 깔끔하게',
    },
  ],
};

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

// export async function GET(req: NextRequest) {
//   try {
//     const cookieStore = await cookies();
//     const limitCookie = cookieStore.get('search_limit');
//     const isLoggedIn = cookieStore.has('refreshToken');

//     const MAX_LIMIT = isLoggedIn ? 3 : 1;

//     const {isBlocked, currentUsage, today} = getSearchLimitStatus(MAX_LIMIT, limitCookie);

//     if (isBlocked) {
//       if (!isLoggedIn) {
//         return NextResponse.json(
//           {
//             title: 'GUEST_LIMIT_REACHED',
//             detail: '무료 체험이 끝났어요. 로그인하고 2회 더 검색해보세요.',
//             status: 429,
//           },
//           {status: 429},
//         );
//       }

//       return NextResponse.json(
//         {
//           title: 'DAILY_LIMIT_EXCEEDED',
//           detail: '오늘의 무료 검색 횟수(3회)를 모두 사용했어요. 내일 다시 시도해주세요.',
//           status: 429,
//         },
//         {status: 429},
//       );
//     }
//     const searchParams = req.nextUrl.searchParams;

//     const keyword = searchParams.get('keyword');
//     const category = searchParams.get('category');

//     if (!keyword) {
//       return NextResponse.json(
//         {
//           title: 'SEARCH_KEYWORD_MISSING',
//           detail: '검색 키워드가 제공되지 않았습니다. 다시 시도해주세요',
//           status: 400,
//         },
//         {status: 400},
//       );
//     }

//     if (!category) {
//       return NextResponse.json(
//         {
//           title: 'SEARCH_CATEGORY_MISSING',
//           detail: '검색 카테고리가 제공되지 않았습니다. 다시 시도해주세요',
//           status: 400,
//         },
//         {status: 400},
//       );
//     }

//     const validation = await validateQueryWithGroq({
//       keyword,
//       category,
//       TIMEOUT_MS: 1200,
//     });

//     if (!validation.isValid) {
//       return NextResponse.json({
//         status: 'fail',
//         summary: validation.message || '적절한 검색어가 아닌 것 같아요. 😅',
//         sources: [],
//       });
//     }

//     const tavilyApiKey = process.env.TAVILY_API_KEY;

//     if (!tavilyApiKey) {
//       return NextResponse.json(
//         {
//           title: 'TAVILY_API_KEY_MISSING',
//           detail: '검색 기능 환경 변수가 누락됐습니다. 관리자에게 문의해주세요.',
//           status: 500,
//         },
//         {status: 500},
//       );
//     }

//     const suffix = CATEGORY_SUFFIX[category] || CATEGORY_SUFFIX['all'];
//     const enhancedQuery = `"${keyword}" ${suffix}`;

//     const client = tavily({apiKey: tavilyApiKey});

//     const tavilyResponse = await client.search(enhancedQuery, {
//       topic: 'general',
//       searchDepth: 'basic',
//       includeAnswer: 'advanced',
//       includeImages: false,
//       country: 'south korea',
//       maxResults: 8,
//     });

//     const newLimitData = JSON.stringify({
//       usage: currentUsage + 1,
//       lastSearchDate: today,
//     });

//     const response = NextResponse.json({
//       status: 'success',
//       summary: tavilyResponse.answer,
//       sources: tavilyResponse.results.map(item => ({
//         title: item.title,
//         url: item.url,
//         snippet: item.content,
//       })),
//     });

//     response.cookies.set('search_limit', newLimitData, {
//       httpOnly: true,
//       secure: true,
//       sameSite: 'strict',
//       maxAge: 60 * 60 * 24 * 2,
//     });

//     return response;
//   } catch (error) {
//     console.error('AI 검색 에러:', error);

//     return NextResponse.json(
//       {
//         title: 'SEARCH_FAILED',
//         detail: '검색에 실패했어요. 잠시 후 다시 시도해주세요.',
//         status: 500,
//       },
//       {status: 500},
//     );
//   }
// }

// export async function GET(req: NextRequest) {
//   const cookieStore = await cookies();
//   const limitCookie = cookieStore.get('search_limit');
//   const isLoggedIn = cookieStore.has('refreshToken');

//   const MAX_LIMIT = isLoggedIn ? 3 : 1;

//   const {isBlocked, currentUsage, today} = getSearchLimitStatus(MAX_LIMIT, limitCookie);

//   if (isBlocked) {
//     if (!isLoggedIn) {
//       return NextResponse.json(
//         {
//           title: 'GUEST_LIMIT_REACHED',
//           detail: '무료 체험이 끝났어요. 로그인하고 2회 더 검색해보세요.',
//           status: 429,
//         },
//         {status: 429},
//       );
//     }

//     return NextResponse.json(
//       {
//         title: 'DAILY_LIMIT_EXCEEDED',
//         detail: '오늘의 무료 검색 횟수(3회)를 모두 사용했어요. 내일 다시 시도해주세요.',
//         status: 429,
//       },
//       {status: 429},
//     );
//   }

//   const searchParams = req.nextUrl.searchParams;

//   const keyword = searchParams.get('keyword');
//   const category = searchParams.get('category');

//   if (!keyword) {
//     return NextResponse.json(
//       {
//         title: 'SEARCH_KEYWORD_MISSING',
//         detail: '검색 키워드가 제공되지 않았습니다. 다시 시도해주세요',
//         status: 400,
//       },
//       {status: 400},
//     );
//   }

//   if (!category) {
//     return NextResponse.json(
//       {
//         title: 'SEARCH_CATEGORY_MISSING',
//         detail: '검색 카테고리가 제공되지 않았습니다. 다시 시도해주세요',
//         status: 400,
//       },
//       {status: 400},
//     );
//   }

//   const validation = await validateQueryWithGroq({
//     keyword,
//     category,
//     TIMEOUT_MS: 1200,
//   });

//   if (!validation.isValid) {
//     return NextResponse.json({
//       status: 'fail',
//       summary: validation.message || '적절한 검색어가 아닌 것 같아요. 😅',
//       sources: [],
//     });
//   }

//   await new Promise(resolve => setTimeout(resolve, 1000));

//   const response = NextResponse.json(MOCK_RESULT);

//   const newLimitData = JSON.stringify({
//     usage: currentUsage + 1,
//     lastSearchDate: today,
//   });

//   response.cookies.set('search_limit', newLimitData, {
//     httpOnly: true,
//     secure: true,
//     sameSite: 'strict',
//     maxAge: 60 * 60 * 24 * 2,
//   });

//   return response;
// }
