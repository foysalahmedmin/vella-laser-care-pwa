"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, {
  ElementType,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

type SupportedElements = "input" | "textarea" | "select";

type FormControlProps<T extends ElementType = SupportedElements> = {
  as?: T | React.ElementType;
  asChild?: boolean;
  isLoading?: boolean;
  loadingClassName?: string;
} & ComponentPropsWithoutRef<T> &
  VariantProps<typeof formControlVariants>;

const formControlVariants = cva(
  "flex w-full rounded-md file:border-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-input bg-card transition-colors file:bg-transparent file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
        gradient:
          "bg-gradient-to-r from-primary to-secondary text-white border-0",
        outline:
          "border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500",
        ghost:
          "bg-transparent border border-transparent focus:border-gray-300 focus:ring-0",
        link: "border-0 bg-transparent underline text-blue-600 hover:text-blue-800 focus:outline-none",
        none: "",
      },
      size: {
        default: "h-10 px-4 text-sm file:text-sm",
        sm: "h-8 px-3 text-xs file:text-xs",
        md: "h-10 px-4 text-sm file:text-sm",
        lg: "h-12 px-6 text-base file:text-base",
        none: "",
      },
      loading: {
        center: "loading-center",
        left: "loading-left",
        right: "loading-right",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  }
);

const FormControl = forwardRef<
  ElementRef<SupportedElements>,
  FormControlProps<SupportedElements>
>(
  (
    {
      className = "primary",
      loadingClassName,
      variant,
      size,
      loading,
      as = "input",
      asChild = false,
      disabled = false,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const Comp = (asChild ? "span" : as || "input") as ElementType;

    return (
      <Comp
        data-as={as || null}
        disabled={disabled || isLoading}
        className={cn(
          formControlVariants({
            variant,
            size,
            loading,
            className,
          }),
          {
            [cn("loading", loadingClassName)]: isLoading,
          }
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

FormControl.displayName = "FormControl";

export { FormControl, formControlVariants };
