import { useClickOutside } from "@/hooks/ui/useClickOutside";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

const dropdownVariants = cva(
  "transition-[opacity,transform] z-30 absolute duration-300 bg-card origin-center text-card-foreground border rounded-md",
  {
    variants: {
      side: {
        left: "-left-2 -translate-x-full top-1/2 -translate-y-1/2 origin-right",
        right: "-right-2 translate-x-full top-1/2 -translate-y-1/2 origin-left",
        top: "-top-2 -translate-y-full left-1/2 -translate-x-1/2 origin-bottom",
        bottom:
          "-bottom-2 translate-y-full left-1/2 -translate-x-1/2 origin-top",
      },
    },
    defaultVariants: {
      side: "bottom",
    },
  },
);

export type DropdownVariants = VariantProps<typeof dropdownVariants>;

export interface DropdownProps
  extends ComponentPropsWithoutRef<"div">,
    DropdownVariants {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ onClose, isOpen, children, className, side, ...props }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    useClickOutside(internalRef as any, onClose);

    return (
      <div
        className={cn(dropdownVariants({ side, className }), {
          "animate-pop scale-0 opacity-0": !isOpen,
          "animate-pop scale-100 opacity-100": isOpen,
        })}
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Dropdown.displayName = "Dropdown";

export { Dropdown, dropdownVariants };
