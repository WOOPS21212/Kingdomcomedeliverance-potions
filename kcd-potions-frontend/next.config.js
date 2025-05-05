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
  // Set basePath for subdirectory deployment only in production
  basePath: process.env.NODE_ENV === 'production' ? '/kingdom-come-deliverance-2-potions' : '',
  // Enable static exports
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
