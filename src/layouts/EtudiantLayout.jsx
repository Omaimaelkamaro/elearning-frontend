import { Outlet } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Navbar from "@/components/navbar/Navbar";

const EtudiantLayout = () => {
  const { user } = useContext(AuthContext);

  return (
   <div className="flex flex-col min-h-screen">
 
      
      <div className="flex flex-1 pt-[80px]"> {/* Ajustez pt selon la hauteur de votre navbar */}
       
        
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
export default EtudiantLayout;