import {Review} from '../model/types';
import CardFrame from './CardFrame';

type Props =
  | {
      reviews: Review[];
      from: 'bestReview';
    }
  | {
      reviews: Review[];
      from: 'myPage';
      onDelete: () => void;
      onEdit: () => void;
    };

export default function ReviewsGrid(props: Props) {
  const {reviews, from} = props;
  return (
    <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-14 md:gap-y-20 content-center justify-items-center mb-16">
      {reviews.map(card =>
        from === 'myPage' ? (
          <CardFrame key={card.board_id} card={card} from="myPage" onDelete={props.onDelete} onEdit={props.onEdit} />
        ) : (
          <CardFrame key={card.board_id} card={card} from="bestReview" />
        ),
      )}
    </ul>
  );
}
