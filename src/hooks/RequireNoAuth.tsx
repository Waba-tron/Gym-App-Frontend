import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface RequireNoAuthProps {
  children: any;
}

const RequireNoAuth = ({ children }: RequireNoAuthProps) => {
  const { values } = useContext(AuthContext);
  const user = localStorage.getItem("user") || values?.user?.token;
  const location = useLocation();

  if (user) {
    return <Navigate to="/account" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireNoAuth;
