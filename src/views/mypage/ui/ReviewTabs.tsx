'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {MyBookmarkedReviews, MyReviews} from '@/features/reviews/my';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/shared/shadcnComponent/ui/tabs';

export default function ReviewTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabValue = searchParams.get('tab') || 'my';

  const handleTabChange = (value: string) => {
    router.push('/mypage?tab=' + value);
  };

  return (
    <Tabs value={tabValue} onValueChange={handleTabChange} defaultValue="my" className="w-full px-4">
      <TabsList className="grid w-full grid-cols-2 gap-2">
        <TabsTrigger value="my">내가 작성한 후기</TabsTrigger>
        <TabsTrigger value="myBookmarks">내가 저장한 후기</TabsTrigger>
      </TabsList>
      <TabsContent value="my">
        <MyReviews />
      </TabsContent>
      <TabsContent value="myBookmarks">
        <MyBookmarkedReviews />
      </TabsContent>
    </Tabs>
  );
}
