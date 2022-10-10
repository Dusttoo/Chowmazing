/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["chowmazing.s3.us-east-2.amazonaws.com", "serpapi.com"]
  },
}

module.exports = nextConfig
