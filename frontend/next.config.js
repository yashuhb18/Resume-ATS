/** @type {import('next').NextConfig} */
const defaultBackendUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://resume-ats-backend-production.up.railway.app'
    : 'http://127.0.0.1:8001';

const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || defaultBackendUrl;

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/health',
        destination: `${backendUrl}/health`,
      },
    ];
  },
};

module.exports = nextConfig;
