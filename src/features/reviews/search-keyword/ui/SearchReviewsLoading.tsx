import {ReviewArticleLoading} from '@/entities/reviews';

export default function SearchReviewsLoading() {
  function renderLoadingContent() {
    const items = [];

    for (let i = 0; i < 5; i++) {
      items.push(<ReviewArticleLoading key={i} />);
    }

    return items;
  }
  return <section className="flex flex-col mt-9 md:mt-12">{renderLoadingContent()}</section>;
}
