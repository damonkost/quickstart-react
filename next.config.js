module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://legalscout.net/api/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
        ],
      },
    ]
  }
} 