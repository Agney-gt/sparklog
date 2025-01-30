import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["drive.google.com"], // Ensure external domains are allowed for images
  },
};

export default nextConfig;