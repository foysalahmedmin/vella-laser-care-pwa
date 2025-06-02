import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  children,
  disabled = false,
}) => (
  <label
    className={cn(
      "flex cursor-pointer items-center space-x-3",
      disabled && "cursor-not-allowed opacity-50",
    )}
  >
    <div
      onClick={disabled ? undefined : onChange}
      className={cn(
        "flex h-5 w-5 items-center justify-center rounded border-2 transition-colors",
        checked ? "border-blue-500 bg-blue-500" : "border-gray-300",
        !disabled && "hover:border-blue-400",
      )}
    >
      {checked && <Check size={16} className="text-white" />}
    </div>
    <span>{children}</span>
  </label>
);

export { Checkbox };
