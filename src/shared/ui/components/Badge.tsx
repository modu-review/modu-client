import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/shared/lib/utils/cn';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-6 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-mediumBlue text-white shadow hover:bg-mediumBlue/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type Props = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

export default function Badge({className, variant, ...props}: Props) {
  return <div className={cn(badgeVariants({variant}), className)} {...props} />;
}
