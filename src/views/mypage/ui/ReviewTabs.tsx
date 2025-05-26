'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {MyBookmarkedReviews, MyReviews} from '@/features/reviews/my';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/shared/shadcnComponent/ui/tabs';
import {RQProvider} from '@/shared/providers';
import {LucideIcon} from '@/shared/ui/icons';
import {ReviewsGridLoading} from '@/entities/reviews';

export default function ReviewTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabValue = searchParams.get('tabs') || 'my';
  const currentPage = Number(searchParams.get('page')) || 1;

  const handleTabChange = (value: string) => {
    router.push('/mypage?tabs=' + value);
  };

  return (
    <Tabs value={tabValue} onValueChange={handleTabChange} defaultValue="my" className="w-full">
      <TabsList className="grid w-full grid-cols-2 gap-2">
        <TabsTrigger value="my">내가 작성한 후기</TabsTrigger>
        <TabsTrigger value="myBookmarks">내가 저장한 후기</TabsTrigger>
      </TabsList>
      <TabsContent value="my">
        <RQProvider LoadingFallback={<ReviewsGridLoading />} icon={<LucideIcon name="Bug" />}>
          <MyReviews currentPage={currentPage} />
        </RQProvider>
      </TabsContent>
      <TabsContent value="myBookmarks">
        <RQProvider LoadingFallback={<ReviewsGridLoading />} icon={<LucideIcon name="Bug" />}>
          <MyBookmarkedReviews currentPage={currentPage} />
        </RQProvider>
      </TabsContent>
    </Tabs>
  );
}
