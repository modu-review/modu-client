import type {NextConfig} from 'next';
import {withSentryConfig} from '@sentry/nextjs';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'picsum.photos'},
      {protocol: 'https', hostname: 'd1izijuzr22yly.cloudfront.net'},
    ],
  },
  productionBrowserSourceMaps: true,
};

export default withSentryConfig(nextConfig, {
  org: 'modu-review',
  project: 'javascript-nextjs-5r',
  authToken: process.env.NEXT_SENTRY_AUTH_TOKEN,

  silent: !process.env.CI,

  disableLogger: true,

  widenClientFileUpload: true,
  sourcemaps: {
    disable: false,
    assets: ['.next/server/chunks/*.js', '.next/server/chunks/*.js.map'],
    ignore: ['**/node_modules/**'],
    deleteSourcemapsAfterUpload: true,
  },
});
