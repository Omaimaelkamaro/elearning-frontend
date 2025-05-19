// src/routes/AdminRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

const FormateurRoute = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated || !user || user.role !== "formateur") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default FormateurRoute;
