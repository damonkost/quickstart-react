/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side only
      config.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      });
    }
    return config;
  },
  // Ensure pages are properly exported
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Add trailing slash to URLs
  trailingSlash: true,
  // Enable source maps in development
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig;