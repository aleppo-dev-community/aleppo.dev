import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";
import { Checkbox } from "../checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../form";
import type { FormFieldItemProps } from "./form-field-item";

const formCheckboxVariants = cva("flex flex-row items-start space-x-3 space-y-0 p-1");

export type FormCheckboxProps<C extends { [k: string]: any } = any> = {
  CheckboxProps?: Omit<
    React.ComponentPropsWithoutRef<typeof Checkbox>,
    "control" | "name" | "noFormMessage" | "variant"
  >;
} & VariantProps<typeof formCheckboxVariants> &
  Omit<FormFieldItemProps<C>, "children">;

const FormCheckbox = React.forwardRef<HTMLDivElement, FormCheckboxProps>(
  (
    {
      label,
      name,
      control,
      className,
      FormControlProps,
      FormDescriptionProps,
      FormItemProps,
      FormFieldProps,
      FormLabelProps,
      CheckboxProps,
      inputClassName,
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
              className={cn(formCheckboxVariants({ className }), FormItemProps?.className)}
            >
              <FormControl {...FormControlProps}>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  {...CheckboxProps}
                  className={cn(inputClassName, CheckboxProps?.className)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel {...FormLabelProps} className={cn(FormLabelProps?.className)}>
                  {label}
                </FormLabel>
                <FormDescription {...FormDescriptionProps} />
                <FormMessage />
                {FormItemProps?.children}
              </div>
            </FormItem>
          );
        }}
      />
    );
  },
);
FormCheckbox.displayName = "FormCheckbox";

// eslint-disable-next-line react-refresh/only-export-components
export { FormCheckbox, formCheckboxVariants };
