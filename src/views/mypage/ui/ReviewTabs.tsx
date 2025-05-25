import {MyReviews} from '@/features/reviews/my';
import {MyBookmarkedReviews} from '@/features/reviews/myBookmarks';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/shared/shadcnComponent/ui/tabs';

const tabsTriggerStyle = '';

export default function ReviewTabs() {
  return (
    <Tabs defaultValue="my" className="w-full px-4">
      <TabsList className="grid w-full grid-cols-2 gap-2">
        <TabsTrigger className={tabsTriggerStyle} value="my">
          내가 작성한 후기
        </TabsTrigger>
        <TabsTrigger className={tabsTriggerStyle} value="myBookmarks">
          내가 저장한 후기
        </TabsTrigger>
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
