import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};

if (process.env.NEXT_PUBLIC_BLOB_BASE_URL) {
  try {
    const hostname = new URL(process.env.NEXT_PUBLIC_BLOB_BASE_URL).hostname;
    nextConfig.images?.remotePatterns?.push({
      protocol: 'https',
      hostname: hostname,
      port: '',
      pathname: '/**',
    });
  } catch (e) {
    console.error("Invalid NEXT_PUBLIC_BLOB_BASE_URL", e);
  }
}

export default nextConfig;
