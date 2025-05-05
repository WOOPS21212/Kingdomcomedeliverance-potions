// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during builds
    ignoreBuildErrors: true,
  },
  // Set basePath for subdirectory deployment
  basePath: process.env.VERCEL ? '/kingdom-come-deliverance-2-potions' : process.env.NODE_ENV === 'production' ? '/kingdom-come-deliverance-2-potions' : '',
  // Configure images
  images: {
    domains: ['404found.art'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '404found.art',
        pathname: '/kingdom-come-deliverance-2-potions/**',
      },
    ],
  }
};

module.exports = nextConfig;
