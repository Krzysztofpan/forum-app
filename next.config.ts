import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ['media.tenor.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  reactStrictMode: false,
}

export default nextConfig
