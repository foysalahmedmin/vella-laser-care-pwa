import { Dropdown } from "@/components/ui/Dropdown";
import { URLS } from "@/config";
import useUser from "@/hooks/states/useUser";
import { cn } from "@/lib/utils";
import { fetchMe } from "@/services/auth.service";
import { ChevronDown, LogOut, User2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import Language from "../Language";
import Logo from "../Logo";

interface HeaderProps {
  className?: string;
}

interface UserData {
  photo?: string;
  name?: string;
  email?: string;
}

const Header = ({ className }: HeaderProps) => {
  const navigate = useNavigate();
  const { clearUser, user } = useUser();

  const { isAuthenticated, role } = user || {};
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: me } = useQuery<UserData>({
    queryKey: ["me"],
    queryFn: () => fetchMe(),
    enabled: isAuthenticated,
  });

  const handleLogout = (): void => {
    clearUser();
    navigate("/");
  };

  return (
    <nav
      className={cn("bg-background sticky top-0 z-50 h-16 w-full", className)}
    >
      <div className="bg-card size-full">
        <div className="container h-full">
          <div className="flex h-full items-center justify-between gap-[1em] lg:gap-[1.5em]">
            <div className="text-base">
              <Logo />
            </div>
            <div className="flex items-center justify-end gap-[1em]">
              <Language className="text-xl" />
              <div>
                {isAuthenticated && (
                  <div className="relative">
                    <div
                      onClick={() => setIsOpen((value) => !value)}
                      className="flex cursor-pointer items-center gap-[0.25em]"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setIsOpen((value) => !value)
                      }
                    >
                      <div className="bg-background size-[2.5em] overflow-hidden rounded-full border">
                        <img
                          src={
                            me?.photo
                              ? `${URLS?.user_photos}/${me?.photo}`
                              : "/images/partials/user.png"
                          }
                          alt={me?.name || "User profile"}
                          className="size-full rounded-full object-cover object-center"
                        />
                      </div>
                      {(me?.name || me?.email) && (
                        <>
                          <div className="hidden space-y-1 leading-none md:block">
                            <span className="text-title/85 block text-[0.875em] leading-none font-medium">
                              {me?.name}
                            </span>
                            <span className="text-muted-foreground block text-[0.75em] leading-none">
                              {me?.email}
                            </span>
                          </div>
                          <ChevronDown className="text-title/85 hidden size-[1.25em] md:block" />
                        </>
                      )}
                    </div>
                    <Dropdown
                      className="shadow-custom-1 right-0 left-auto z-[60] min-w-40 origin-top-right -translate-x-0"
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    >
                      <ul className="space-y-1">
                        <li className="hover:bg-muted/15 flex cursor-pointer items-center gap-2 px-4 py-2">
                          <div className="text-title/85 inline-block size-5 rounded-full object-cover object-center">
                            {user?.image ? (
                              <img
                                src={
                                  user?.image
                                    ? String(user.image)
                                    : "/images/partials/user.png"
                                }
                                alt={
                                  user?.name
                                    ? String(user.image)
                                    : "User profile"
                                }
                                className="size-full rounded-full object-cover object-center"
                              />
                            ) : (
                              <User2 className="size-full" />
                            )}
                          </div>
                          <span
                            onClick={() =>
                              navigate(
                                role === "parlor"
                                  ? "/parlor/profile"
                                  : "/user/profile",
                              )
                            }
                            className="cursor-pointer text-sm leading-none"
                          >
                            View Profile
                          </span>
                        </li>
                        <li
                          onClick={handleLogout}
                          className="hover:bg-muted/15 flex cursor-pointer items-center gap-2 px-4 py-2"
                        >
                          <div className="text-title/85 inline-block size-5 rounded-full object-cover object-center">
                            <LogOut className="size-full" />
                          </div>
                          <span className="cursor-pointer text-sm leading-none">
                            Logout
                          </span>
                        </li>
                      </ul>
                    </Dropdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
