/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // TODO remove, errors started after React ^19.2.3
    ignoreBuildErrors: true,
  },
  transpilePackages: ["@workspace/ui"],
  images: {
    domains: ["uploads.aleppo.dev"],
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    unoptimized: true,
  },
};

export default nextConfig;
