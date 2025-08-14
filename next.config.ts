import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  experimental: { viewTransition: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "dummyimage.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  async rewrites() {
    const origin = process.env.SIMULATOR_PROXY_ORIGIN;
    if (!origin) return [];
    const base = origin.replace(/\/$/, "");
    return [
      { source: "/simulator-app", destination: `${base}/` },
      { source: "/simulator-app/", destination: `${base}/` },
      { source: "/simulator-app/:path*", destination: `${base}/:path*` },
    ];
  },
};

export default nextConfig;
