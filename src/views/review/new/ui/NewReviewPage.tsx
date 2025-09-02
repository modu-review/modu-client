import {Metadata} from 'next';
import NewReviewClient from './NewReviewClient';
import checkSession from '@/shared/lib/utils/checkSession';

export const metadata: Metadata = {
  title: '새 후기 작성',
  description: '새로운 후기를 작성해보세요.',
};

export default async function NewReviewPage() {
  await checkSession();

  return (
    <section className="fixed inset-0 z-20 w-full h-full bg-gray-50">
      <NewReviewClient />
    </section>
  );
}
