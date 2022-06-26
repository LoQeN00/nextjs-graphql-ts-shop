/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  optimizeFonts: true,
  images: {
    domains: ['naszsklep-api.vercel.app', 'picsum.photos'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    gzipSize: true,
  },
};

module.exports = nextConfig;
