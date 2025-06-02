/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    domains: ["uploads.aleppo.dev"],
  },
};

export default nextConfig;
