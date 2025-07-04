// components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import Spinner, { type PublicRouteProps } from "../constants/constant";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }:PublicRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (user) return <Navigate to="/" replace />;

  return children;
};

export default PublicRoute;
