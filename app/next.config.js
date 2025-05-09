/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      serverActions: true, // enable this if you're using `use server`
    },
  };
  
  module.exports = nextConfig;
  