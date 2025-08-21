import {Skeleton} from '@/shared/shadcnComponent/ui/skeleton';
import {cva, VariantProps} from 'class-variance-authority';

const profileImageVariant = cva('', {
  variants: {
    page: {
      my: 'w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border-boldBlue border-[7px]',
      postsByUser: '',
    },
  },
});

type Props = VariantProps<typeof profileImageVariant>;

export default function ProfileImageLoading({page}: Props) {
  return (
    <div className={profileImageVariant({page})}>
      <Skeleton className="w-full h-full rounded-full" />
    </div>
  );
}
