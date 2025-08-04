'use client';

import {useMutation} from '@tanstack/react-query';
import {useState} from 'react';
import {ContactFormSchemaType} from './type';
import {sendSlackMessage} from '../api/api-service';

export function useSendSlackMessage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {mutate, ...rest} = useMutation({
    mutationFn: (data: ContactFormSchemaType) => sendSlackMessage(data),
    onSuccess: () => {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    },
  });

  return {
    isSubmitted,
    sendMessage: mutate,
    ...rest,
  };
}
