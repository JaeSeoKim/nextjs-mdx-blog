const { withPlaiceholder } = require("@plaiceholder/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPlaiceholder(nextConfig);
