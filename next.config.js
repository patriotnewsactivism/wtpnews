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
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  experimental: {
    optimizeCss: true,
  }
};

module.exports = nextConfig;