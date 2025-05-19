import useLanguage from "@/hooks/states/useLanguage";
import { cn } from "@/lib/utils";
import React from "react";

interface LanguageProps {
  className?: string;
}

const Language: React.FC<LanguageProps> = ({ className }) => {
  const { code, toggleLanguage } = useLanguage();

  return (
    <div
      onClick={toggleLanguage}
      className={cn(
        "bg-background relative inline-flex h-[1em] w-[2.5em] cursor-pointer overflow-hidden rounded-[2em] font-semibold shadow-inner select-none",
        className,
      )}
      role="button"
      tabIndex={0}
      aria-label="Toggle language"
    >
      <div className="absolute top-0 right-[0.15em] bottom-0 left-[0.15em] flex items-center justify-evenly rounded-[2em] transition-all duration-500">
        <span
          className={cn(
            "text-muted-foreground pt-[0.125em] text-[0.5em] leading-none opacity-0 transition-all duration-300",
            {
              "opacity-100": code === "bn",
            },
          )}
          aria-hidden="true"
        >
          BN
        </span>
        <span
          className={cn(
            "text-muted-foreground pt-[0.125em] text-[0.5em] leading-none opacity-0 transition-all duration-300",
            {
              "opacity-100": code === "en",
            },
          )}
          aria-hidden="true"
        >
          EN
        </span>
      </div>
      <div
        className={cn(
          "bg-card absolute top-1/2 right-[0.15em] left-[0.15em] z-10 mx-auto inline-block size-[0.75em] -translate-y-1/2 rounded-full transition-all duration-500",
          {
            "-translate-x-full": code === "en",
            "translate-x-full": code === "bn",
          },
        )}
        aria-hidden="true"
      >
        <img
          className={cn(
            "absolute inset-0 inline-block size-full rotate-180 rounded-full object-cover object-center opacity-0 transition-all duration-300",
            {
              "rotate-0 opacity-100": code === "en",
            },
          )}
          src="/images/flags/usa.svg"
          alt="USA Flag"
          width={12}
          height={12}
        />
        <img
          className={cn(
            "absolute inset-0 inline-block size-full rotate-180 rounded-full object-cover object-center opacity-0 transition-all duration-300",
            {
              "rotate-0 opacity-100": code === "bn",
            },
          )}
          src="/images/flags/bd.svg"
          alt="Bangladesh Flag"
          width={12}
          height={12}
        />
      </div>
    </div>
  );
};

export default Language;
