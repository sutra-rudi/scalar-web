/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cms.sutra.hr',
      },

      {
        hostname: 'placehold.co',
      },
      {
        hostname: 'lavender-loris-843955.hostingersite.com',
      },
      {
        hostname: 'cms.scalar.hr',
      },
    ],
  },
};

export default nextConfig;
