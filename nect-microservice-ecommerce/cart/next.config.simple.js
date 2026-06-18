/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/cart",
  async rewrites() {
    return [
      {
        source: "/",
        destination: "http://localhost:3000/",
      },
    ];
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;

