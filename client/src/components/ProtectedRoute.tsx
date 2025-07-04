import { Navigate } from "react-router-dom";
import Spinner, { type PublicRouteProps } from "../constants/constant";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }: PublicRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (!user)
    return (
      <Navigate to="/login" replace state={{ redirectUrl: window.location.pathname }} />
    );

  return children;
};

export default ProtectedRoute;
