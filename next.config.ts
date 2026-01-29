import type { NextConfig } from "next";
import "./src/env"

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos"],
  }
};

export default nextConfig;
