import NewReviewClient from './NewReviewClient';
import checkSession from '@/shared/lib/utils/checkSession';

export default async function NewReviewPage() {
  await checkSession();

  return (
    <section className="fixed inset-0 z-20 w-full h-full bg-white">
      <NewReviewClient />
    </section>
  );
}
