import { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
  // Netlify Image CDN supports both relative and absolute URLs
  return src;
};

export default function netlifyLoader({ src, width, quality }: ImageLoaderProps) {
  if (process.env.NODE_ENV === "development") {
    return src;
  }
  const params = [`url=${encodeURIComponent(normalizeSrc(src))}`, `w=${width}`];
  if (quality) {
    params.push(`q=${quality}`);
  }
  const paramsString = params.join("&");
  return `/.netlify/images?${paramsString}`;
}
