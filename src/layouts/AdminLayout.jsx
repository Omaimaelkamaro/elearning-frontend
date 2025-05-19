// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebars/AdminSidebar"; 
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const AdminLayout = () => {
  const { user } = useContext(AuthContext);

  return (
   <div className="flex pt-[34px] ">
      <Sidebar user={user} />
      <main >
        <div className="flex-1 p-10">
        <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
