import type { NextConfig } from "next";
import "./src/env"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
