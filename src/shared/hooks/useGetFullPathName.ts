'use client';

import {usePathname, useSearchParams} from 'next/navigation';

export default function useGetFullPathName() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  if (searchParams.size) {
    return `${pathName}?${searchParams.toString()}`;
  } else {
    return pathName;
  }
}
