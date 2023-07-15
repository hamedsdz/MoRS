/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig: {
    backendUrl: process.env.NEXT_APP_API,
    backdropUrl: process.env.BACKDROP_IMAGES_BASE_URL,
    posterUrl: process.env.POSTER_IMAGES_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themoviedb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
  i18n: {
    locales: ["fa"],
    defaultLocale: "fa",
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
