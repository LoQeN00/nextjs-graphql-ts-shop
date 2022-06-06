/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  optimizeFonts: true,
  experimental: {
    gzipSize: true,
  },
};

module.exports = nextConfig;
