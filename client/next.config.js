/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig: {
    backendUrl: process.env.NEXT_APP_API,
  },
};

module.exports = nextConfig;
