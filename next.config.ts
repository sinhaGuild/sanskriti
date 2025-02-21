import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'storage.googleapis.com'], // Allow images from Firebase Storage
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
        port: '',
        pathname: '/pbxt/**',
      },
    ],
  },
}

export default nextConfig
