// src/routes/AdminRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated || !user || user.role !== "administrateur") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoute;
