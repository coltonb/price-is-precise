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
  env: {
    pusherKey: process.env.PUSHER_KEY,
    pusherCluster: process.env.PUSHER_CLUSTER,
  },
};

module.exports = nextConfig;
