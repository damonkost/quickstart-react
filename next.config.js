/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/attorneys',
        destination: '/api/v1/attorneys/index.js',
      }
    ];
  }
};

module.exports = nextConfig; 