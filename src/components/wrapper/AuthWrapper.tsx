import useUser from "@/hooks/states/useUser";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

interface PrivateRouteProps {
  children: ReactNode;
}

const AuthWrapper: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user?.isAuthenticated) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
