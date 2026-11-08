import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@cassux/shared', '@cassux/game-core'],
};

export default nextConfig;
