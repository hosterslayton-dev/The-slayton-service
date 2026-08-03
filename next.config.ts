import type { NextConfig } from "next";

/**
 * Platform-level Next.js configuration.
 *
 * Kept deliberately lean: performance and correctness defaults only.
 * Feature-specific config (rewrites, headers for future portal/API
 * modules) will be layered in during their own phases.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Remote patterns will be added when external imagery/CMS sources
    // are introduced in later phases.
  },
};

export default nextConfig;
