import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hime.no",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tvguide.vg.no",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/driftmeldinger",
        destination: "/driftsmeldinger",
        permanent: true,
      },
      {
        source: "/internett",
        destination: "/produkter-og-priser",
        permanent: true,
      },
      {
        source: "/tv",
        destination: "/produkter-og-priser",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
