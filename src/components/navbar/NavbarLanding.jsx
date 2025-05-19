import {GraduationCap, ShoppingCart, Search,Bell } from "lucide-react";
import { Link } from "react-router-dom";
import DarkMode from "@/pages/DarkMode";
import React from "react";
import { useState,useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button'
import api from "@/service/api";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavbarLanding = () => {


const [categories, setCategories] = useState([]);

 const { t, i18n } = useTranslation();
       const [language, setLanguage] = useState(i18n.language || "fr");
       const handleChange = (lang) => {
         setLanguage(lang);
         i18n.changeLanguage(lang);
       };
 

  useEffect(() => {
         api.get("/categories").then(res => {
          console.log('Catégories reçues :', res.data);
          setCategories(res.data.categories); 
        })
        .catch(err => {
          console.error('Erreur lors de la récupération des catégories', err);
        });
    }, []);
  return (
     <div className="dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 z-10">
          {/* Main Navbar */}
          <div className="h-16">
            <div className="max-w-8xl mx-auto flex justify-between items-center h-full px-6 gap-3 ">
              {/* Logo at left edge */}
              <div className="flex items-center gap-2">
                
                 <Link to="/">
  <h1 className="font-extrabold text-xl text-gray-800 dark:text-white">
    <span className="relative inline-block">
     {t("logo")}
             <GraduationCap
               size={16}
               className="absolute -top-2 left-0.5 text-indigo-500  dark:text-white"
             />
           </span>
           
         </h1>
       </Link>
                 </div>
       
       
              <div className="flex items-center w-full px-4 gap-x-6">
         {/* Explore link */}
         <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <button className="text-base font-extralight hover:text-blue-500 focus:outline-none ">
            {t("explore")}
           </button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{t("exploreByCategory")}</DropdownMenuLabel>
           <DropdownMenuSeparator />
           <DropdownMenuGroup>
         {categories.map((category) => (
           <DropdownMenuItem key={category.id}>
              <Link to={`/category/${category.id}`} className="w-full">
             {language === "fr" ? category.titre : category.title}
           </Link>
           </DropdownMenuItem>
         ))}
       </DropdownMenuGroup>
       
         </DropdownMenuContent>
       </DropdownMenu>
       
         {/* Search Bar */}
         <div className=" max-w-xl w-full "> {/* ajuste ici la largeur */}
           <div className="relative">
             <Input 
               type="text" 
               placeholder={t("searchPlaceholder")}
               className="pl-10 pr-4 py-6 w-full rounded-full border border-gray-300 dark:border-gray-700 focus-visible:ring-offset-0  focus:ring-blue-500 
                    hover:border-blue-500 focus-visible:ring-offset-0"
             />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
               <div className="flex items-center gap-6">
                <Button asChild variant="outline">
    <Link to="/">{t("login.title")}</Link>
  </Button>
  <Button asChild variant="default">
    <Link to="/signup">{t("signup.title")}</Link>
  </Button>
             <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-sm font-extralight hover:text-blue-500 focus:outline-none flex items-center gap-2">
                        {language === "fr" ? "🇫🇷" : "🇬🇧"} {/* Affiche l'emoji actif */}
                        <span>{language === "fr" ? t("languageFrench") : t("languageEnglish")}</span>
                              </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                     <DropdownMenuItem onClick={() => handleChange("fr")}>
                                       {t("languageFrench")}
                                     </DropdownMenuItem>
                                     <DropdownMenuItem onClick={() => handleChange("en")}>
                                       {t("languageEnglish")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

            <Link to="/cart" className="text-sm font-extralight hover:text-blue-500 flex items-center gap-2">
  <ShoppingCart size={18} strokeWidth={1} />
</Link>
 
<Link to="/notifications" className="text-sm font-normal hover:text-blue-500 flex items-center ">
  <Bell size={18} strokeWidth={1} />
</Link>
<DarkMode />


       </div>
      </div>
    </div>
 </div>
  );
};

export default NavbarLanding;
