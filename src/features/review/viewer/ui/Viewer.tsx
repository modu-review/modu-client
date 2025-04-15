import {Badge} from '@/shared/ui/components';
import {CATEGORY_MAP} from '../../shared/consts/categoryList';
import {ReviewContent} from '../../shared/model/type';

export default function Viewer({title, category, author, created_at, content}: ReviewContent) {
  return (
    <section className="flex flex-col h-full overflow-auto">
      <header className="mx-4 mt-4 pb-4 border-b-2 border-gray-300">
        <Badge>{CATEGORY_MAP[category]}</Badge>
        <h1 className="text-2xl md:text-3xl font-semibold mt-3">{title}</h1>
        <div className="flex items-center gap-2 ml-0.5 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-[35px] h-[35px] bg-gray-400 rounded-full" />
            <p>{author}</p>
          </div>
          <p className="text-gray-500">{created_at}</p>
        </div>
      </header>
      <div
        className="prose prose-p:my-3 prose-h1:font-bold prose-h1:text-[1.9em] md:prose-h1:text-[2.1em] lg:prose-lg focus:outline-none p-5"
        dangerouslySetInnerHTML={{__html: content}}
      />
    </section>
  );
}
