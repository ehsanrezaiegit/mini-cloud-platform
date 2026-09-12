import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias["content-collections"] = path.resolve(
      process.cwd(),
      ".content-collections/generated",
    );
    return config;
  },
};

export default withContentCollections(nextConfig);
