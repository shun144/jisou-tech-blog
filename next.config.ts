import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  /* config options here */
  cacheComponents: true,
};

export default nextConfig;
