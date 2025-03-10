import {CardList, CategoryBar} from '@/shared/ui/components';
const MOCK = [
  {
    board_id: 'abcde1232',
    title: '안녕하세요 전 피자남',
    author: '피자러버님',
    category: '음식',
    content: '저는 피자를 정말 좋아하는데...',
    comments_count: 24,
    bookmarks: 59,
    image_url: 'https://example.com/pizza.jpg',
  },
  {
    board_id: 'abcde1233',
    title: '아이스크림 좋아요',
    author: '김둥뚱',
    category: '음식',
    content: '저는 피자를 정말 좋아하는데...',
    comments_count: 24,
    bookmarks: 59,
    image_url: 'https://example.com/pizza.jpg',
  },
  {
    board_id: 'abcde1234',
    title: '아이스크림 좋아요',
    author: '김둥뚱',
    category: '음식',
    content: '저는 피자를 정말 좋아하는데...',
    comments_count: 24,
    bookmarks: 59,
    image_url: 'https://example.com/pizza.jpg',
  },
  {
    board_id: 'abcde1235',
    title: '아이스크림 좋아요',
    author: '김둥뚱',
    category: '음식',
    content: '저는 피자를 정말 좋아하는데...',
    comments_count: 24,
    bookmarks: 59,
    image_url: 'https://example.com/pizza.jpg',
  },
  {
    board_id: 'abcde1236',
    title: '아이스크림 좋아요',
    author: '김둥뚱',
    category: '음식',
    content: '저는 피자를 정말 좋아하는데...',
    comments_count: 24,
    bookmarks: 59,
    image_url: 'https://example.com/pizza.jpg',
  },
  {
    board_id: 'abcde1237',
    title: '아이스크림 좋아요',
    author: '김둥뚱',
    category: '음식',
    content: '저는 피자를 정말 좋아하는데...',
    comments_count: 24,
    bookmarks: 59,
    image_url: 'https://example.com/pizza.jpg',
  },
];

export default function BestReview() {
  return (
    <section className="bg-boldBlue mt-16 py-24 px-8">
      <CategoryBar />
      <CardList cards={MOCK} from={'mainpage'} />
    </section>
  );
}
