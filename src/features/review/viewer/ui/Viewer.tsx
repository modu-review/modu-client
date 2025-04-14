import {Badge} from '@/shared/ui/components';
import {CATEGORY_MAP} from '../../shared/consts/categoryList';
import {ReviewContent} from '../../shared/model/type';

export default function Viewer({title, category, author, created_at, content}: ReviewContent) {
  return (
    <section className="flex flex-col h-full">
      <header>
        <Badge>{CATEGORY_MAP[category]}</Badge>
        <h1 className="text-3xl">{title}</h1>
        <div>
          <p>{author}</p>
          <p>{created_at}</p>
        </div>
      </header>
      <article className="h-full overflow-auto">
        <div
          className="prose prose-p:my-3 prose-h1:font-bold lg:prose-lg focus:outline-none"
          dangerouslySetInnerHTML={{__html: content}}
        />
      </article>
    </section>
  );
}
