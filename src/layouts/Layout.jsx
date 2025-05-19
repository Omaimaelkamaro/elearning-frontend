import React from "react";
import Navbar from "@/components/navbar/Navbar"; 

import { Outlet } from "react-router-dom";
import Footer from "@/pages/footer"

const Layout = () => {
  return (
    <>

     <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="pt-12">
        <Outlet /> 
      </main>
     <Footer/>
   </div>
    </>
  );
};

export default Layout;
