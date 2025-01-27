/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
    return config;
  },
  transpilePackages: ['@vapi-ai/web', 'react-spinners'],
  // Important: Remove output: 'standalone' or 'export'
}

module.exports = nextConfig 