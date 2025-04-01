import ReviewArticleLoading from './ReviewArticleLoading';

export default function ReviewArticleLoadingContainer() {
  function renderLoadingContent() {
    const items = [];

    for (let i = 0; i < 5; i++) {
      items.push(<ReviewArticleLoading key={i} />);
    }

    return items;
  }
  return <section className="flex flex-col">{renderLoadingContent()}</section>;
}
