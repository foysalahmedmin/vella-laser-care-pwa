import useUser from "@/hooks/states/useUser";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  BellIcon,
  HeartIcon,
  HomeIcon,
  LayoutDashboardIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { NavLink } from "react-router";

type NavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    label: "Products",
    icon: ShoppingBagIcon,
    href: "/products",
  },
];

const CUSTOMER_NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    label: "Products",
    icon: ShoppingBagIcon,
    href: "/products",
  },
  {
    label: "Favorite",
    icon: HeartIcon,
    href: "/favorites",
  },
  {
    label: "Notification",
    icon: BellIcon,
    href: "/notifications",
  },
  {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    href: "/dashboard",
  },
];

const Navigation: React.FC = () => {
  const { user } = useUser();
  const { role } = user || {};
  const items = role === "customer" ? CUSTOMER_NAV_ITEMS : NAV_ITEMS;
  return (
    <nav className="fixed bottom-0 z-50 h-16 w-full border-t border-gray-200 bg-white">
      <div className="container mx-auto h-full">
        <div className="flex h-full items-center justify-around">
          {items?.map((item) => (
            <NavLink
              to={item.href}
              key={item.href}
              className="flex w-20 flex-col items-center justify-center rounded-full py-1 text-xs"
            >
              {({ isActive }) => (
                <>
                  <div
                    className={cn(
                      "mb-0.5 flex w-16 items-center justify-center rounded-full py-1",
                      {
                        "text-primary-foreground bg-primary": isActive,
                      },
                    )}
                  >
                    <item.icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                  </div>
                  <span
                    className={cn("text-xs", {
                      "text-primary": isActive,
                    })}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
