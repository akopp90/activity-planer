/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});
const nextConfig = withPWA({
  experimental: {
    newNextLinkBehavior: true,
  },
  compiler: {
    styledComponents: false,
  },
  transpilePackages: ["next-auth"],
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/diyt2gaxc/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/diyt2gaxc/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
});

module.exports = nextConfig;
