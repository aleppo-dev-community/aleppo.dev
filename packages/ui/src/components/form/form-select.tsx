import * as React from "react";

import { cn } from "../../lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import type { FormFieldItemProps } from "./form-field-item";
import { FormFieldItem } from "./form-field-item";

export type FormSelectProps<C extends { [k: string]: any } = any> = {
  SelectProps?: Omit<React.ComponentPropsWithoutRef<typeof Select>, "name">;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  disabled?: boolean;
} & Omit<FormFieldItemProps<C>, "children">;

const FormSelect = React.forwardRef<HTMLDivElement, FormSelectProps>(
  ({ SelectProps, options, placeholder, disabled, required = false, label, ...props }, ref) => {
    return (
      <FormFieldItem {...props} ref={ref} required={required} label={label}>
        {(field) => (
          <Select
            {...field}
            {...SelectProps}
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger className={cn("min-w-full")}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormFieldItem>
    );
  },
);
FormSelect.displayName = "FormSelect";

export { FormSelect };
