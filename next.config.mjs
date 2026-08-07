/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/library',
        destination: '/#library',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
