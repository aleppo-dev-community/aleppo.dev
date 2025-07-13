import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { LoaderIcon } from "lucide-react";

const loadingVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "size-4",
      default: "size-10",
      lg: "size-20",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type LoadingProps = React.SVGProps<SVGSVGElement> & VariantProps<typeof loadingVariants>;
export function Loading({ size, className, ...props }: LoadingProps) {
  return <LoaderIcon {...props} className={cn(loadingVariants({ size, className }))} />;
}
