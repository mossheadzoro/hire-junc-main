/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  // Add the rewrites to proxy API requests
  async rewrites() {
    return [
      {
        source: '/api/:path*', // API requests from the frontend
        destination: 'http://3.109.201.211:8747/api/:path*', // Proxy to AWS backend (without SSL)
      },
    ];
  },
};

module.exports = nextConfig;
