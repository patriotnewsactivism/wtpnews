/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.wtpnews.org', pathname: '/**' },
      { protocol: 'https', hostname: 'wtpnews.org', pathname: '/**' }
    ]
  },
  async redirects() {
    return [{ source: '/old', destination: '/new', permanent: true }];
  },
  async rewrites() {
    return [
      { source: '/api/:path*', destination: 'https://api.wtpnews.org/:path*' }
    ];
  }
};

module.exports = nextConfig;
