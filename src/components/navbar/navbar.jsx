import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import NavbarLanding from "./NavbarLanding";
import NavbarEtudiant from "./NavbarEtudiant";
import NavbarFormateur from "./NavbarFormateur";
import NavbarAdmin from "./NavbarAdmin";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Si on est sur la landing page
 if (["/", "/login", "/signup"].includes(location.pathname)) {
    return <NavbarLanding />;
  }

  // Si connecté, choisir le navbar selon le rôle
  if (user?.role === "etudiant") {
    return <NavbarEtudiant />;
  }

  if (user?.role === "formateur") {
    return <NavbarFormateur />;
  }

  if (user?.role === "administrateur") {
    return <NavbarAdmin />;
  }

  // Fallback
  return null;
};

export default Navbar;
