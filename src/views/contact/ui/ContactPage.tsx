import {ContactForm} from '@/features/contact';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: '문의하기',
  description: '문의사항을 작성해주세요.',
  openGraph: {
    title: '문의하기',
    description: '문의사항을 작성해주세요.',
  },
};

export default function ContactPage() {
  return (
    <section className="flex items-start justify-center bg-gray-100 md:h-full md:py-10 ">
      <ContactForm />
    </section>
  );
}
