import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../button";
import type { FormInputProps } from "./form-input";
import { FormInput } from "./form-input";

export const FormPasswordInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, InputProps, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <>
        <FormInput
          {...props}
          InputProps={{ type: showPassword ? "text" : "password" }}
          FormControlProps={{
            children: (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute bottom-0 right-0 h-full px-3 py-2 hover:bg-transparent hover:text-accent-2"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={InputProps?.disabled}
              >
                {showPassword && !InputProps?.disabled ? (
                  <EyeIcon className="size-4" aria-hidden="true" />
                ) : (
                  <EyeOffIcon className="size-4" aria-hidden="true" />
                )}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            ),
            className: "relative",
          }}
          inputClassName={cn("hide-password-toggle pr-10 min-w-full", className)}
          ref={ref}
        />

        {/* hides browsers password toggles */}
        <style>
          {`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}
        </style>
      </>
    );
  },
);
FormPasswordInput.displayName = "PasswordInput";
