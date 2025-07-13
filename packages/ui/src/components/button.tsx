import { Slot, Slottable } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Loading } from "./loading";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-md  text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        auth: "bg-black uppercase font-rubik font-bold w-full rounded-full text-white",
        transparent:
          "bg-transparent uppercase font-bold w-full rounded-full text-tropicana-blackText border border-tropicana-blackText",
        gold: "rounded-full font-rubik font-bold uppercase text-tropicana-blackText mobile-s:text-sm mobile-m:text-base shadow-lg bg-gradient-to-r from-tropicana-yellowText to-[#DEAF1D] transition hover:brightness-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400",
        green:
          " rounded-full uppercase font-extrabold text-white mobile-s:text-xs mobile-m:text-sm shadow-lg bg-tropicana-deep-green transition hover:brightness-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-800",

        underline: "text-tropicana-blackText underline-offset-2 underline",
        accent:
          "bg-accent-foreground text-accent shadow hover:bg-accent-foreground/90 focus-visible:ring-2 focus-visible:ring-primary",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "text-primary hover:bg-accent hover:text-accent-foreground",
        "ghost-default": "text-primary-foreground",
        "ghost-accent": "text-accent-foreground hover:bg-accent hover:text-accent-foreground",
        "black-outline":
          "rounded-full font-rubik font-bold uppercase w-full text-tropicana-blackText border-2 border-black disabled:border-black/50 bg-background mobile-s:text-sm mobile-m:text-base shadow-sm hover:bg-accent hover:text-accent-foreground",

        "ghost-destructive": "text-destructive hover:text-destructive",
        link: "text-primary underline-offset-4 hover:underline",
        permalink: "text-blue-600 underline-offset-2 underline",
        reset:
          "w-full bg-white cursor-pointer text-black uppercase font-rubik font-bold py-2 px-6 rounded-full shadow-md disabled:opacity-50 hover:bg-primary hover:text-white",
      },
      size: {
        default: "h-9 px-4 py-5",
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-10 px-8",
        xl: "h-10 px-12",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading,
  startIcon,
  endIcon,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      type="button"
      {...props}
      disabled={isLoading || props.disabled}
    >
      {startIcon}
      {(size !== "icon" || !isLoading) && <Slottable>{children}</Slottable>}
      {isLoading ? <Loading className={cn(size !== "icon" && "ms-1")} size="sm" /> : endIcon}
    </Comp>
  );
}

export { Button, buttonVariants };
