/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["top-notch.s3.us-east-2.amazonaws.com"]
  },
}

module.exports = nextConfig
