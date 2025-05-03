"use client";

import { cn } from "@/lib/utils";
import type {
  ForwardedRef,
  HTMLAttributes,
  LiHTMLAttributes,
  ReactNode,
} from "react";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";

// Define types for the tabs context
type TabsContextType = {
  value: string | undefined;
  onTabSelect: (tabValue: string) => void;
};

// tabs context //
export const TabsContext = createContext<TabsContextType | null>(null);

export const useTabs = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("useTabs must be used within a <Tabs />");
  }

  return context;
};

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  setValue?: (tabValue: string) => void;
  children: ReactNode;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    { className, value: valueProp, setValue: setValueProp, children, ...props },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [value, setValue] = useState(valueProp);

    const onTabSelect = (tabValue: string) => {
      setValue(tabValue);
      if (setValueProp) {
        setValueProp(tabValue);
      }
    };

    useEffect(() => {
      if (valueProp !== undefined) {
        setValue(valueProp);
      }
    }, [valueProp]);

    return (
      <TabsContext.Provider
        value={{
          value,
          onTabSelect,
        }}
      >
        <div ref={ref} className={cn("relative", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

// tabs contents //
type TabsListProps = HTMLAttributes<HTMLUListElement>;

const TabsList = forwardRef<HTMLUListElement, TabsListProps>(
  ({ className, ...props }, ref: ForwardedRef<HTMLUListElement>) => {
    return (
      <ul
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-1 overflow-x-auto",
          className,
        )}
        {...props}
      />
    );
  },
);
TabsList.displayName = "TabsList";

interface TabsTriggerProps extends LiHTMLAttributes<HTMLLIElement> {
  activeClassName?: string;
  value?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const TabsTrigger = forwardRef<HTMLLIElement, TabsTriggerProps>(
  (
    { className, activeClassName, value, disabled, isLoading, ...props },
    ref: ForwardedRef<HTMLLIElement>,
  ) => {
    const { value: contextValue, onTabSelect } = useTabs();
    return (
      <li
        ref={ref}
        onClick={() =>
          !disabled &&
          !isLoading &&
          value !== undefined &&
          value !== null &&
          onTabSelect(value)
        }
        data-state={value === contextValue ? "active" : "inactive"}
        className={cn(
          "hover-underline-overlay text-title after:border-title cursor-pointer after:mx-auto after:origin-center disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
          {
            [cn(
              "text-primary after:border-primary cursor-default after:w-full",
              activeClassName,
            )]: value === contextValue,
          },
        )}
        // disabled={disabled || isLoading}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

type TabsContentProps = HTMLAttributes<HTMLDivElement>;

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    return <div ref={ref} className={cn("", className)} {...props} />;
  },
);
TabsContent.displayName = "TabsContent";

interface TabsItemProps extends HTMLAttributes<HTMLDivElement> {
  activeClassName?: string;
  value?: string;
}

const TabsItem = forwardRef<HTMLDivElement, TabsItemProps>(
  (
    { className, activeClassName, value, ...props },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { value: contextValue } = useTabs();
    return (
      <div
        ref={ref}
        className={cn("hidden", className, {
          [cn("block", activeClassName)]: value === contextValue,
        })}
        {...props}
      />
    );
  },
);
TabsItem.displayName = "TabsItem";

export { Tabs, TabsContent, TabsItem, TabsList, TabsTrigger };
