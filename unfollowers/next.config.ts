// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// };
// module.exports = nextConfig;

import { NextConfig } from 'next';

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Ensure this is passed to your app during build
  },
};

export default nextConfig;
