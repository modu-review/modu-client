import {Editor} from '@/features/review/editor';
import checkSession from '@/shared/lib/utils/checkSession';

export default async function ReviewWritePage() {
  await checkSession();

  return (
    <section className="w-full h-full max-w-5xl mx-auto">
      <Editor />
    </section>
  );
}
