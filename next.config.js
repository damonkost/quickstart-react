/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Add CSS handling
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    return config;
  },
  // Handle external packages
  transpilePackages: ['@vapi-ai/web', 'react-spinners'],
}

module.exports = nextConfig 