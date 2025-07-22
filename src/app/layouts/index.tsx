import type {Metadata} from 'next';
import '@/app/styles';
import pretandard from '@/app/fonts';
import Providers from '@/app/providers';
import {Header} from '@/widgets/header';
import {Footer} from '@/widgets/footer';
import {Toaster} from 'sonner';

export const metadata: Metadata = {
  title: {
    default: '모두의 후기',
    template: '모두의 후기 | %s',
  },
  description: '세상 모든 후기를 확인해보세요',
  icons: {
    icon: '/resources/logo.ico',
  },
};

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretandard.className} antialiased flex flex-col w-full`}>
        <Providers>
          <header className="sticky top-0 z-10 px-5 bg-white/85 backdrop-blur-xl">
            <Header />
          </header>
          <main className="grow w-full mx-auto">{children}</main>
          <div id="modal-root" />
        </Providers>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
