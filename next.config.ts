import type { NextConfig } from "next";

const assetsHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_ASSETS_URL ? new URL(process.env.NEXT_PUBLIC_ASSETS_URL).hostname : "";
  } catch {
    return "";
  }
})();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Origen remoto de imágenes (bucket S3). Agrega aquí tu CDN si migras a CloudFront.
    remotePatterns: [
      ...(assetsHost ? [{ protocol: "https" as const, hostname: assetsHost }] : []),
      { protocol: "https", hostname: "mayanpool.s3.amazonaws.com" },
      { protocol: "https", hostname: "mayanpool.s3.us-east-1.amazonaws.com" },
    ],
    minimumCacheTTL: 2678400, // 31 días
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Video y recursos estáticos con caché larga (cambia el nombre del archivo al actualizarlo).
        source: "/videos/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
