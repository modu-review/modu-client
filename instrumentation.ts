import {type Instrumentation} from 'next';
import {captureRequestError} from '@sentry/nextjs';

export const onRequestError: Instrumentation.onRequestError = captureRequestError;

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
}
