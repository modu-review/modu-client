import type {Metadata} from 'next';
import '@/app/styles';
import pretandard from '@/app/fonts';
import Providers from '@/app/providers';
import {Header} from '@/widgets/header';
import {Footer} from '@/widgets/footer';
import {Toaster} from 'sonner';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

export const metadata: Metadata = {
  title: {
    default: '모두의 후기',
    template: '모두의 후기 | %s',
  },
  description: '세상 모든 후기를 확인해보세요',
};

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <body className={`${pretandard.className} antialiased flex flex-col w-full h-full overflow-x-hidden`}>
        <Providers>
          <Header />
          <main className="grow w-full mx-auto">{children}</main>
          <ReactQueryDevtools />
        </Providers>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
