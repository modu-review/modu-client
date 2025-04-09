'use client';

import {requestGet} from '@/shared/apis';
import {useEffect} from 'react';

export default function Page() {
  useEffect(() => {
    const tmp = async () => {
      await requestGet({
        endpoint: '/hello',
      });
    };

    tmp();
  }, []);
  return <section>tmp</section>;
}
