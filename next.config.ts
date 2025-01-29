import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["drive.google.com"],
  },
  async rewrites() {
    return [
      {
        source: "/auth/v1/callback", // The URL that you want to map
        destination: "/api/auth/callback", // The file that should handle the callback
      },
    ];
  },
};

export default nextConfig;
