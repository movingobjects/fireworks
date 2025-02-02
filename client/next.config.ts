import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/visual-electric-fireworks' : '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  env: { NEXT_PUBLIC_BASE_PATH: isProd ? basePath : '' },
};

export default nextConfig;