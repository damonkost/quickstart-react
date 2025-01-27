/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: '.next',
  output: 'export',
  images: {
    unoptimized: true
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
    return config;
  },
  transpilePackages: ['@vapi-ai/web', 'react-spinners']
}

module.exports = nextConfig 