import {Review} from '@/entities/reviews';

type Props = {card: Review};

export default function CardFrame({
  card: {category, image_url, title, content, author, comments_count, bookmarks},
}: Props) {
  return <article></article>;
}
