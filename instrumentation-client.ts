import {isDevelopment, isProduction} from '@/shared/lib/utils/env';
import * as Sentry from '@sentry/nextjs';

const getEnvironmentConfig = () => {
  if (isProduction) {
    return {
      /**
       * 트랜잭션 수집 비율로 여기서 트랜잭션은 사용자의 행동 단위를 의미합니다.
       * 페이지 로드, API 호출, 혹은 버튼 클릭으로 인한 데이터 처리 등이 트랜잭션에 해당됩니다.
       *
       * 왜 수집하느냐?
       * 이 행동은 에러 모니터링 보다 성능 모니터링에 가까운데, 에러가 없어도 정상적인 동작에 대한 성능 데이터를 수집합니다.
       * 페이지 로딩에 시간이 얼마나 걸리는지, API 호출이 얼마나 빠른지 등을 수집해 성능 개선에 활용할 수 있습니다.
       */
      tracesSampleRate: 0.1, // 프로덕션에서는 10%만
      replaysSessionSampleRate: 0.01, // 정상 세션 1%만 리플레이
      sampleRate: 1.0, // 에러는 100% 수집
      enableLogs: false, // 프로덕션에서는 로그 비활성화
    };
  }

  if (isDevelopment) {
    return {
      tracesSampleRate: 1.0, // 개발환경에서는 100%
      replaysSessionSampleRate: 0.1, // 10%만 리플레이
      sampleRate: 1.0, // 에러 100%
      enableLogs: true, // 개발시에는 로그 활성화
    };
  }
};

const config = getEnvironmentConfig();

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  environment: process.env.NODE_ENV,
  // 샘플링 설정
  ...config,

  // 에러 발생 시 항상 100% 수집
  replaysOnErrorSampleRate: 1.0,

  // 성능 최적화 설정
  maxBreadcrumbs: 50, // 기본 100에서 축소
  maxValueLength: 1000, // 긴 값 자르기
  normalizeDepth: 5, // 객체 깊이 제한
  normalizeMaxBreadth: 1000, // 객체 속성 개수 제한

  integrations: [
    Sentry.replayIntegration({
      // 민감한 정보는 마스킹 설정
      maskAllText: true,
      maskAllInputs: true,
      blockAllMedia: true,

      //   이후 민감한 클래스/속성이 생기면 아래 주석 해제 후 추가
      //   mask: ['input[type="password"]'],
      block: ['iframe', 'object', 'embed'],
    }),
  ],

  tracePropagationTargets: [
    /^https:\/\/api\.modu-review\.com/,
    /^https:\/\/dev\.modu-review\.com:3000/,
    /^https:\/\/.*\.modu-review\.com/,
  ],

  beforeSendTransaction(event) {
    const transactionName = event.transaction;

    const ignoredTransactions = ['/_next/static', '/favicon.ico', '/robots.txt', '/sitemap.xml'];

    if (ignoredTransactions.some(ignored => transactionName?.includes(ignored))) {
      return null;
    }

    const duration = event.timestamp! - event.start_timestamp!;
    // 100ms 미만은 무시
    if (duration < 100) {
      return Math.random() < 0.01 ? event : null; // 1%만 수집
    }

    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
