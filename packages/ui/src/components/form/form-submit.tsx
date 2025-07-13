"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "../../lib/utils";
import { Button, ButtonProps } from "../button";

export type FormSubmitProps = ButtonProps & { showOnDirtyOnly?: boolean };

export function FormSubmit({ children, showOnDirtyOnly = false, ...props }: FormSubmitProps) {
  const form = useFormContext();
  const hide = showOnDirtyOnly && Object.keys(form?.formState.dirtyFields).length < 1;
  return (
    !hide && (
      <Button
        type="submit"
        isLoading={form?.formState.isSubmitting}
        disabled={form?.formState.isSubmitting}
        {...props}
        className={cn(
          Object.keys(form.formState.errors).length !== 0 && "text-destructive",
          props.className,
        )}
      >
        {children ?? "Submit"}
      </Button>
    )
  );
}
