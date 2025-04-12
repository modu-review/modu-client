import checkSession from '@/shared/lib/utils/checkSession';

export default async function ReviewWritePage() {
  await checkSession();

  return <section>후기 작성 페이지</section>;
}
