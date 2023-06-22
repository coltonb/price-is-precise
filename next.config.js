/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/teams",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
