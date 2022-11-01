import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface RequireAdminProps {
  children: any;
}

const RequireAdmin = ({ children }: RequireAdminProps) => {
  const { values } = useContext(AuthContext);
  const user = JSON.parse(String(localStorage.getItem("user"))) || values?.user;
  const location = useLocation();

  if (!user?.isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAdmin;
