import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.themoviedb.org',
      },
    ],
  },
  devIndicators: false,
  // Exclui caches do rastreamento de arquivos
  outputFileTracingExcludes: {
    "*": ["cache/**/*", ".next/cache/**/*"],
  },
};

export default nextConfig;
