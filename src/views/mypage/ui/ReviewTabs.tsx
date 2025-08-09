'use client';

import dynamic from 'next/dynamic';
import {useRouter, useSearchParams} from 'next/navigation';
import {MyReviewsGridLoading} from '@/features/reviews/my';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/shared/shadcnComponent/ui/tabs';
import {RQProvider} from '@/shared/providers';
import {LucideIcon} from '@/shared/ui/icons';

const MyReviews = dynamic(() => import('@/features/reviews/my/ui/MyReviews'), {
  ssr: false,
  loading: () => <MyReviewsGridLoading />,
});

const MyBookmarkedReviews = dynamic(() => import('@/features/reviews/my/ui/MyBookmarkedReviews'), {
  ssr: false,
  loading: () => <MyReviewsGridLoading />,
});

export default function ReviewTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabValue = searchParams.get('tabs') || 'my';
  const currentPage = Number(searchParams.get('page')) || 1;

  const handleTabChange = (value: string) => {
    router.push('/mypage?tabs=' + value, {scroll: false});
  };

  return (
    <Tabs
      value={tabValue}
      onValueChange={handleTabChange}
      defaultValue="my"
      className="w-full relative mt-6 md:mt-10 mb-8"
    >
      <TabsList className="grid w-full grid-cols-2 gap-2 mb-5 md:mb-6">
        <TabsTrigger value="my">내가 작성한 후기</TabsTrigger>
        <TabsTrigger value="myBookmarks">내가 저장한 후기</TabsTrigger>
      </TabsList>
      <TabsContent value="my">
        <RQProvider LoadingFallback={<MyReviewsGridLoading />} icon={<LucideIcon name="Bug" />}>
          <MyReviews currentPage={currentPage} />
        </RQProvider>
      </TabsContent>
      <TabsContent value="myBookmarks">
        <RQProvider LoadingFallback={<MyReviewsGridLoading />} icon={<LucideIcon name="Bug" />}>
          <MyBookmarkedReviews currentPage={currentPage} />
        </RQProvider>
      </TabsContent>
    </Tabs>
  );
}
