/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig: {
    backendUrl: process.env.NEXT_APP_API,
    backdropUrl: process.env.BACKDROP_IMAGES_BASE_URL,
    posterUrl: process.env.POSTER_IMAGES_BASE_URL,
  },
};

module.exports = nextConfig;
