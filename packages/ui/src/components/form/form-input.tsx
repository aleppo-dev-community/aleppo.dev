import * as React from "react";

import { cn } from "../../lib/utils";
import { Input } from "../input";
import type { FormFieldItemProps } from "./form-field-item";
import { FormFieldItem } from "./form-field-item";

export type FormInputProps<C extends { [k: string]: any } = any> = {
  InputProps?: Omit<React.ComponentPropsWithoutRef<typeof Input>, "name">;
} & Omit<FormFieldItemProps<C>, "children"> &
  Pick<React.ComponentPropsWithoutRef<typeof Input>, "type" | "placeholder" | "disabled">;

const FormInput = React.forwardRef<HTMLDivElement, FormInputProps>(
  (
    {
      inputClassName,
      InputProps,
      type,
      placeholder,
      disabled,
      required = false, // for adding asterisk
      label,
      ...props
    },
    ref,
  ) => {
    return (
      <FormFieldItem {...props} ref={ref} required={required} label={label}>
        {(field) => (
          <Input
            {...field}
            {...{ type, placeholder, disabled }}
            {...InputProps}
            className={cn(inputClassName, "min-w-full")}
          />
        )}
      </FormFieldItem>
    );
  },
);
FormInput.displayName = "FormInput";

export { FormInput };
