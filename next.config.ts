import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [
    { protocol: "https", hostname: "ui-lib.com" },
    { protocol: "https", hostname: "res.cloudinary.com" },
  ] }
};

export default nextConfig;
