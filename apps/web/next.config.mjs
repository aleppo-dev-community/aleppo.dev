/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    domains: ["uploads.aleppo.dev"],
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    unoptimized: true,
  },
};

export default nextConfig;
