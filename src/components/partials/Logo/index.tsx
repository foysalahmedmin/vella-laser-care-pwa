import { cn } from "@/lib/utils";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
} from "react";

interface LogoProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ className, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        className={cn(
          "flex h-[2.75em] items-end gap-[.25em] text-base",
          className,
        )}
        {...props}
        ref={ref}
      >
        <img
          className="h-full object-contain"
          src="/images/partials/logo.png"
          alt="Company logo"
        />
      </div>
    );
  },
);

Logo.displayName = "Logo";

export default Logo;
