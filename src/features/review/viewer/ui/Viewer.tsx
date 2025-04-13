import {CATEGORY_MAP} from '../../shared/consts/categoryList';
import {ReviewContent} from '../../shared/model/type';

export default function Viewer({title, category, author, created_at, content}: ReviewContent) {
  return (
    <section>
      <header>
        <p>{CATEGORY_MAP[category]}</p>
        <h1>{title}</h1>
        <div>
          <p>{author}</p>
          <p>{created_at}</p>
        </div>
      </header>
      <div
        className="prose prose-p:my-3 prose-h1:font-bold lg:prose-lg focus:outline-none"
        dangerouslySetInnerHTML={{__html: content}}
      />
    </section>
  );
}
