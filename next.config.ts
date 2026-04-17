import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: 'oseamalibu.com' },
      { protocol: 'https', hostname: 'osea.imgix.net' },
      { protocol: 'https', hostname: 'truebotanicals.com' },
      { protocol: 'https', hostname: 'www.juaraskincare.com' },
      { protocol: 'https', hostname: 'www.shanidarden.com' },
      { protocol: 'https', hostname: 'www.thegoldensecrets.com' },
      { protocol: 'https', hostname: 'www.amazon.com' },
    ],
  },
};

export default nextConfig;
