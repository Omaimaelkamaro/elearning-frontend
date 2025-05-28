// src/routes/AdminRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

const EtudiantRoute = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated || !user || user.role !== "etudiant") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default EtudiantRoute;
