import React from "react";
import { Link } from "react-router-dom";
import { BarChart, BookOpen } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="hidden lg:block w-[300px] border-r border-gray-300 dark:border-gray-700  top-0 h-[calc(100vh-80px)]">
      <div className="space-y-6 pt-4 p-5">
        <Link to="/dashboard" className="flex items-center gap-2 hover:text-primary">
          <BarChart size={22} />
          <h1>Dashboard</h1>
        </Link>
        <Link to="/courses" className="flex items-center gap-2 hover:text-primary">
          <BookOpen size={22} />
          <h1>Courses</h1>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;