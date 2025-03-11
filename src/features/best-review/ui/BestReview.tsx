'use client';

import {CategoryBar} from '@/shared/ui/components';
import {useState} from 'react';
import ReviewCard from '@/shared/ui/components/ReviewCard';

const MOCK = [
  {
    board_id: 'abcde12324',
    title: '안녕하세요 전 피자남',
    author: '피자러버님',
    category: '전체',
    content:
      '저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...',
    comments_count: 24,
    bookmarks: 59,
    image_url: 'https://example.com/pizza.jpg',
  },
  {
    board_id: 'abcde12325',
    title: '안녕하세요 전 피자남',
    author: '피자러버님',
    category: '전체',
    content:
      '저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...',
    comments_count: 24,
    bookmarks: 59,
    image_url: 'https://example.com/pizza.jpg',
  },
  {
    board_id: 'abcde12326',
    title: '안녕하세요 전 피자남',
    author: '피자러버님',
    category: '전체',
    content:
      '저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...',
    comments_count: 24,
    bookmarks: 59,
    image_url: 'https://example.com/pizza.jpg',
  },
  {
    board_id: 'abcde12327',
    title: '안녕하세요 전 피자남',
    author: '피자러버님',
    category: '전체',
    content:
      '사실 전 햄버거를 더 좋아하는데... 사실 전 햄버거를 더 좋아하는데... 사실 전 햄버거를 더 좋아하는데... 사실 전 햄버거를 더 좋아하는데... 사실 전 햄버거를 더 좋아하는데... 사실 전 햄버거를 더 좋아하는데...',
    comments_count: 24,
    bookmarks: 59,
    image_url: 'https://example.com/pizza.jpg',
  },
  {
    board_id: 'abcde12328',
    title: '안녕하세요 전 피자남',
    author: '피자러버님',
    category: '전체',
    content: '저는 사실 아이스크림을 좋아하는데...',
    comments_count: 24,
    bookmarks: 59,
    image_url: 'https://example.com/pizza.jpg',
  },
  {
    board_id: 'abcde12329',
    title: '안녕하세요 전 피자남',
    author: '피자러버님',
    category: '전체',
    content:
      '저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...',
    comments_count: 24,
    bookmarks: 59,
    image_url: 'https://example.com/pizza.jpg',
  },
  {
    board_id: 'abcde1232',
    title: '안녕하세요 전 피자남',
    author: '피자러버님',
    category: '음식',
    content:
      '저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...저는 피자를 정말 좋아하는데...',
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
  {
    board_id: 'abcde1238',
    title: '아이스크림 좋아요',
    author: '김둥뚱',
    category: '전자제품',
    content: '저는 피자를 정말 좋아하는데...',
    comments_count: 24,
    bookmarks: 59,
    image_url: 'https://example.com/pizza.jpg',
  },
];

export default function BestReview() {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const filteredCards =
    selectedCategory === '전체'
      ? MOCK.filter(card => card.category === '전체')
      : MOCK.filter(card => card.category === selectedCategory);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <section className=" flex flex-col items-center justify-center bg-boldBlue mt-16 py-12 px-8">
      <h4 className="text-white font-bold text-2xl mb-8">🔥 BEST 후기 🔥</h4>
      <CategoryBar selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 content-center justify-items-center">
        {filteredCards.map(card => (
          <li key={card.board_id}>
            <ReviewCard card={card} from="bestReview" />
          </li>
        ))}
      </ul>
    </section>
  );
}
