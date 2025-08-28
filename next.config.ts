import type {NextConfig} from 'next';
import {withSentryConfig} from '@sentry/nextjs';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'picsum.photos'},
      {protocol: 'https', hostname: 'd1izijuzr22yly.cloudfront.net'},
    ],
  },
};

export default withSentryConfig(nextConfig, {
  org: 'modu-review.com',
  project: 'javascript-nextjs-5r',

  silent: !process.env.CI,

  disableLogger: true,
});
