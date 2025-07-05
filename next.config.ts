import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'picsum.photos'},
      {protocol: 'https', hostname: 'd1izijuzr22yly.cloudfront.net'},
    ],
  },
};
export default nextConfig;
