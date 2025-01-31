/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Remove rewrites since Next.js handles API routes automatically
  // Add webpack configuration for proper file handling
  webpack: (config, { isServer }) => {
    // Handle CSS imports
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
    return config;
  },
};

module.exports = nextConfig;