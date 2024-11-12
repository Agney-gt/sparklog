import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["drive.google.com"],
  },
};

export default nextConfig;
