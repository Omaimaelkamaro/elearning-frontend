import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  // Si l'utilisateur est connecté, on autorise l'accès
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
