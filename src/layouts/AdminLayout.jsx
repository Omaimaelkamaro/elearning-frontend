import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebars/AdminSidebar";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Navbar from "@/components/navbar/Navbar";

const AdminLayout = () => {
  const { user } = useContext(AuthContext);

  return (
   <div className="flex flex-col min-h-screen">
 
      
      <div className="flex flex-1 pt-[34px]"> {/* Ajustez pt selon la hauteur de votre navbar */}
        <Sidebar user={user} />
        
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;