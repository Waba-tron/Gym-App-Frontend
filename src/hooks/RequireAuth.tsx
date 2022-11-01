import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface RequireAuthProps {
  children: any;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { values } = useContext(AuthContext);
  const user =
    JSON.parse(String(localStorage.getItem("user"))) || values?.user?.token;
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
