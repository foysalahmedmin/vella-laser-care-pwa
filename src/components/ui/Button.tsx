"use client";

import useRippleEffect from "@/hooks/ui/useRippleEffect";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  RefObject,
} from "react";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

type SupportedElements = "button" | "input" | "textarea" | "select";

type ButtonProps<T extends ElementType = SupportedElements> = {
  as?: T | React.ElementType;
  asChild?: boolean;
  isLoading?: boolean;
  isAnimation?: boolean;
  loadingClassName?: string;
} & ComponentPropsWithoutRef<T> &
  VariantProps<typeof buttonVariants>;

const buttonVariants = cva(
  "button animate-pop relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-none border border-transparent text-base leading-tight whitespace-nowrap transition-all duration-300 ease-in-out active:scale-95 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-accent-foreground hover:bg-foreground hover:text-background",
        gradient:
          "bg-gradient-to-r from-primary to-secondary text-white border-transparent",
        outline:
          "border hover:border-accent hover:text-accent hover:bg-transparent bg-accent text-accent-foreground",
        ghost:
          "bg-transparent text-accent hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-blue-500 hover:text-blue-700 underline",
        none: "",
      },
      size: {
        default: "h-10 px-4 text-sm",
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        none: "",
      },
      shape: {
        default: "rounded-md",
        icon: "rounded-md aspect-square px-0",
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
      size: "default",
      shape: "default",
      loading: "center",
    },
  },
);

const Button = forwardRef<
  ElementRef<SupportedElements>,
  ButtonProps<SupportedElements>
>(
  (
    {
      className = "primary",
      loadingClassName,
      variant,
      size,
      shape,
      loading,
      as = "button",
      asChild = false,
      disabled = false,
      isLoading = false,
      isAnimation = false,
      ...props
    },
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useImperativeHandle(
      ref,
      () => buttonRef.current as ElementRef<SupportedElements>,
    );
    useRippleEffect(buttonRef as RefObject<HTMLElement>, !isAnimation);

    const Comp = asChild ? "span" : as;
    return (
      <Comp
        data-as={as || null}
        disabled={disabled || isLoading}
        className={cn(
          buttonVariants({
            variant,
            size,
            shape,
            loading,
            className,
          }),
          {
            [cn("loading", loadingClassName)]: isLoading,
          },
        )}
        ref={buttonRef}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
