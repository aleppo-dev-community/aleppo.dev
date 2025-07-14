import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import type { Control, ControllerRenderProps, Path } from "react-hook-form";

import { Info } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../button";
import type { FormDescription } from "../form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card";

const formFieldVariants = cva("flex", {
  variants: {
    variant: {
      row: "flex-col sm:flex-row sm:items-center sm:gap-2",
      column: "flex-col sm:gap-2",
    },
  },
});
const formLabelDescVariants = cva("my-2 flex items-center gap-1 sm:my-0", {
  variants: {
    variant: {
      row: "w-40 min-w-40 max-w-full self-start",
      column: "",
    },
  },
});
const formLabelVariants = cva("flex items-center", {
  variants: {
    variant: {
      row: "",
      column: "",
    },
  },
});

export type FormFieldItemProps<C extends { [k: string]: any } = any> = VariantProps<
  typeof formFieldVariants
> & {
  name: keyof C extends string ? keyof C : string;
  control?: Control<C>;
  label?: React.ReactNode;
  FormItemProps?: React.ComponentPropsWithoutRef<typeof FormItem>;
  FormControlProps?: React.ComponentPropsWithoutRef<typeof FormControl>;
  FormFieldProps?: React.ComponentPropsWithoutRef<typeof FormField>;
  FormDescriptionProps?: React.ComponentPropsWithoutRef<typeof FormDescription>;
  FormLabelProps?: React.ComponentPropsWithoutRef<typeof FormLabel>;
  FormMessageProps?: React.ComponentPropsWithoutRef<typeof FormMessage>;
  children: (props: ControllerRenderProps<C, Path<C>>) => React.ReactElement;
  className?: string;
  inputClassName?: string;
  noFormMessage?: boolean;
  description?: React.ReactNode;
  required?: boolean;
};

const FormFieldItem = React.forwardRef<HTMLDivElement, Omit<FormFieldItemProps, "inputClassName">>(
  (
    {
      label,
      name,
      control,
      FormControlProps,
      FormDescriptionProps,
      FormItemProps,
      FormFieldProps,
      FormLabelProps,
      FormMessageProps,
      className,
      children,
      variant = "column",
      required = false,
      noFormMessage,
      description,
    },
    ref,
  ) => {
    return (
      <FormField
        name={name}
        control={control}
        {...FormFieldProps}
        render={({ field }) => {
          return (
            <FormItem
              ref={ref}
              {...FormItemProps}
              className={cn(formFieldVariants({ variant }), FormItemProps?.className, className)}
            >
              {label !== undefined && (
                <div className={cn(formLabelDescVariants({ variant }))}>
                  <FormLabel
                    {...FormLabelProps}
                    className={cn(formLabelVariants({ variant }), FormLabelProps?.className)}
                  >
                    {label}
                    <span className={cn(required ? "text-destructive mx-1" : "hidden")}>*</span>
                    {variant === "row" && label && <span className="hidden sm:inline">:</span>}
                    {(description || FormDescriptionProps) && (
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost-accent"
                            className="mb-1 ms-1 inline-flex size-4 sm:mb-0"
                          >
                            <Info />
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="text-sm">
                          {FormDescriptionProps?.children ?? description}
                        </HoverCardContent>
                      </HoverCard>
                    )}
                  </FormLabel>
                </div>
              )}
              <div className={cn("relative", FormControlProps?.className)}>
                <FormControl {...FormControlProps}>{children(field)}</FormControl>
                {FormControlProps?.children}
              </div>
              {!noFormMessage && (
                <FormMessage
                  {...FormMessageProps}
                  className={cn(
                    "self-start",
                    variant === "row" && "pt-2",
                    FormMessageProps?.className,
                  )}
                />
              )}
              {FormItemProps?.children}
            </FormItem>
          );
        }}
      />
    );
  },
);
FormFieldItem.displayName = "FormFieldItem";

// eslint-disable-next-line react-refresh/only-export-components
export { FormFieldItem, formFieldVariants, formLabelDescVariants, formLabelVariants };
