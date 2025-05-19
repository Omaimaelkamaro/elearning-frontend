import React from "react";
import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "@/pages/footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
     <Navbar/>
      <main className="flex-1 pt-12">
        <Outlet />
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Layout;