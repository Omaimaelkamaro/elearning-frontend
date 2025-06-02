import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, BookOpen, Users,CreditCard ,ClipboardEdit ,FilePlus   } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";


const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
const { t, i18n } = useTranslation();
  const language = i18n.language;
  return (
    <div 
      className={cn(
        "relative lg:block border-r border-gray-700", // bordure sombre
        "top-0 h-screen sticky transition-all duration-300 ease-in-out",
        "hover:w-[300px] group",
        "bg-black text-white", // <<< COULEUR PRINCIPALE
        expanded ? "w-[300px]" : "w-[80px]"
      )}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      
 <div className="p-4 ">
        {/* <Link to="" className={cn(
            "flex items-center gap-3 hover:text-primary transition-colors",
            "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          )}>
          {expanded ? (
            <h1 className="font-extrabold text-xl hover:text-primary transition-colors text-white dark:text-white flex items-center gap-2">
              <GraduationCap size={20} className="text-indigo-500 dark:text-indigo-500" />
              <span>Madrassa</span>
            </h1>
          ) : (
            <GraduationCap 
              size={24} 
              className="text-indigo-500 w-6 flex justify-center dark:text-indigo-500 "
            />
          )}
        </Link> */}
      </div>

      <div className="space-y-6 pt-2 p-5 overflow-hidden ">
        
        <Link 
          to="/admin/dashboard" 
          className={cn(
            "flex items-center gap-3 hover:text-primary transition-colors",
            "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <div className="w-6 flex justify-center">
            <BarChart size={22} />
          </div>
          <span className={cn(
            "transition-all duration-200 whitespace-nowrap",
            expanded ? "opacity-100 ml-2" : "opacity-0 w-0"
          )}>
           {t("Dashboard")} 
          </span>
        </Link>
        
        <Link 
  to="/admin/users" 
  className={cn(
    "flex items-center gap-3 hover:text-primary transition-colors",
    "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
  )}
>
  <div className="w-6 flex justify-center">
    <Users size={22} />
  </div>
  <span className={cn(
    "transition-all duration-200 whitespace-nowrap",
    expanded ? "opacity-100 ml-2" : "opacity-0 w-0"
  )}>
   { t("Users")}
  </span>
</Link>

         <Link 
          to="/admin/cours" 
          className={cn(
            "flex items-center gap-3 hover:text-primary transition-colors",
            "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <div className="w-6 flex justify-center">
            <BookOpen size={22} />
          </div>
          <span className={cn(
            "transition-all duration-200 whitespace-nowrap",
            expanded ? "opacity-100 ml-2" : "opacity-0 w-0"
          )}>
            {t("Courses")}
          </span>
        </Link>

<Link 
          to="/admin/cours" 
          className={cn(
            "flex items-center gap-3 hover:text-primary transition-colors",
            "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <div className="w-6 flex justify-center">
            < ClipboardEdit    size={22} />
          </div>
          <span className={cn(
            "transition-all duration-200 whitespace-nowrap",
            expanded ? "opacity-100 ml-2" : "opacity-0 w-0"
          )}>
            {t("Inscriptions")}
          </span>
        </Link>
       <Link 
          to="/admin/cours" 
          className={cn(
            "flex items-center gap-3 hover:text-primary transition-colors",
            "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <div className="w-6 flex justify-center">
            < CreditCard  size={22} />
          </div>
          <span className={cn(
            "transition-all duration-200 whitespace-nowrap",
            expanded ? "opacity-100 ml-2" : "opacity-0 w-0"
          )}>
            {t("Paiement")}
          </span>
        </Link>

        <Link 
          to="/admin/cours" 
          className={cn(
            "flex items-center gap-3 hover:text-primary transition-colors",
            "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <div className="w-6 flex justify-center">
            < FilePlus  size={22} />
          </div>
          <span className={cn(
            "transition-all duration-200 whitespace-nowrap",
            expanded ? "opacity-100 ml-2" : "opacity-0 w-0"
          )}>
            {t("Requests")}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;