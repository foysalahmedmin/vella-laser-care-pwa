"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from "embla-carousel";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import emblaCarouselClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

// ----- Types -----

type CarouselOrientation = "horizontal" | "vertical";

interface CarouselContextValue {
  carouselRef: (node: HTMLElement | null) => void;
  api: EmblaCarouselType | undefined;
  setApi?: (api: EmblaCarouselType) => void;
  opts?: EmblaOptionsType;
  orientation: CarouselOrientation;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  handleKeyDown: (event: KeyboardEvent) => void;
  selectedIndex: number;
  scrollSnaps: number[];
  scrollToIndex: (index: number) => void;
  isHovered: boolean;
}

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: CarouselOrientation;
  autoplay?: boolean;
  opts?: EmblaOptionsType;
  setApi?: (emblaApi: EmblaCarouselType) => void;
  plugins?: EmblaPluginType[];
  children: ReactNode;
}

interface CarouselPaginationTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  activeClassName?: string;
  variant?: "default" | "gradient" | "outline" | "ghost" | "link" | "none";
  size?: "default" | "sm" | "md" | "lg" | "none";
}

interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: "icon" | "default";
  variant?: "default" | "gradient" | "outline" | "ghost" | "link" | "none";
  children?: ReactNode;
}

// ----- Custom Hooks -----

export const useCarouselNavigation = (api?: EmblaCarouselType) => {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  const onSelect = useCallback(() => {
    if (api) {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }
  }, [api]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent | KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  useEffect(() => {
    if (api) {
      onSelect();
      api.on("reInit", onSelect).on("select", onSelect);
    }
  }, [api, onSelect]);

  return {
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    handleKeyDown,
  };
};

export const useCarouselPagination = (api?: EmblaCarouselType) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollToIndex = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  const onInit = useCallback(() => {
    if (api) setScrollSnaps(api.scrollSnapList());
  }, [api]);

  const onSelect = useCallback(() => {
    if (api) setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (api) {
      onInit();
      onSelect();
      api.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
    }
  }, [api, onInit, onSelect]);

  return { selectedIndex, scrollSnaps, scrollToIndex };
};

export const useCarouselAutoplayHover = (api?: EmblaCarouselType) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    const autoplay = api?.plugins?.().autoplay;
    if (autoplay?.stop) autoplay.stop();
  }, [api]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    const autoplay = api?.plugins?.().autoplay;
    if (autoplay?.play) autoplay.play();
  }, [api]);

  useEffect(() => {
    const node = api?.containerNode?.();
    const autoplay = api?.plugins?.().autoplay;

    if (autoplay && node) {
      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        node.removeEventListener("mouseenter", handleMouseEnter);
        node.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [api, handleMouseEnter, handleMouseLeave]);

  return { isHovered };
};

// ----- Context -----

export const CarouselContext = createContext<CarouselContextValue | null>(null);

export const useCarousel = (): CarouselContextValue => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
};

// ----- Components -----

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      autoplay,
      opts,
      setApi,
      plugins = [],
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      [
        emblaCarouselClassNames(),
        ...(autoplay ? [emblaCarouselAutoplay({ delay: 5000 })] : []),
        ...plugins,
      ],
    );

    useEffect(() => {
      if (api && setApi) {
        setApi(api);
      }
    }, [api, setApi]);

    const navigation = useCarouselNavigation(api);
    const pagination = useCarouselPagination(api);
    const hover = useCarouselAutoplayHover(api);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          setApi,
          opts,
          orientation,
          ...navigation,
          ...pagination,
          ...hover,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={navigation.handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex h-full",
          { "flex-col": orientation === "vertical" },
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full self-stretch",
          className,
        )}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPreviousTrigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (
    {
      className,
      shape = "icon",
      variant = "none",
      children = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.5"
            d="m6 8l-4 4l4 4m-4-4h20"
          />
        </svg>
      ),
      ...props
    },
    ref,
  ) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return (
      <Button
        ref={ref}
        shape={shape}
        variant={variant}
        className={cn(
          "bg-muted text-foreground absolute text-[1em]",
          orientation === "horizontal"
            ? "top-1/2 left-0 -translate-y-1/2"
            : "top-0 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        {children}
      </Button>
    );
  },
);
CarouselPreviousTrigger.displayName = "CarouselPreviousTrigger";

const CarouselNextTrigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (
    {
      className,
      shape = "icon",
      variant = "none",
      children = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.5"
            d="m18 8l4 4l-4 4M2 12h20"
          />
        </svg>
      ),
      ...props
    },
    ref,
  ) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return (
      <Button
        ref={ref}
        shape={shape}
        variant={variant}
        className={cn(
          "bg-muted text-foreground absolute text-[1em]",
          orientation === "horizontal"
            ? "top-1/2 right-0 -translate-y-1/2"
            : "bottom-0 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        {children}
      </Button>
    );
  },
);
CarouselNextTrigger.displayName = "CarouselNextTrigger";

const CarouselPaginationTrigger = forwardRef<
  HTMLButtonElement,
  CarouselPaginationTriggerProps
>(
  (
    {
      className,
      activeClassName,
      isActive,
      variant = "none",
      size = "none",
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "bg-muted h-[0.125rem] w-full max-w-full flex-1 rounded-full px-0",
          className,
          { [cn("bg-accent", activeClassName)]: isActive },
        )}
        variant={variant}
        size={size}
        {...props}
      />
    );
  },
);
CarouselPaginationTrigger.displayName = "CarouselPaginationTrigger";

const CarouselPagination = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    buttonProps?: CarouselPaginationTriggerProps;
  }
>(({ className, buttonProps, ...props }, ref) => {
  const { selectedIndex, scrollSnaps, scrollToIndex } = useCarousel();
  return (
    <div
      ref={ref}
      className={cn(
        "absolute right-0 bottom-4 left-0 mx-auto flex w-full items-center justify-center gap-1",
        className,
      )}
      {...props}
    >
      {scrollSnaps.map((_, index) => (
        <CarouselPaginationTrigger
          key={index}
          isActive={index === selectedIndex}
          onClick={() => scrollToIndex(index)}
          {...buttonProps}
        />
      ))}
    </div>
  );
});
CarouselPagination.displayName = "CarouselPagination";

// ----- Exports -----

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextTrigger,
  CarouselPagination,
  CarouselPaginationTrigger,
  CarouselPreviousTrigger,
};
