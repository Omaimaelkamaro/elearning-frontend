import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/service/api";
import {
  GraduationCap,
  ShoppingCart,
  Search,
  Bell
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "@/context/AuthContext";

import { Input } from "@/components/ui/input";
import DarkMode from "@/pages/DarkMode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const NavbarEtudiant = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "fr");
  const handleChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const navigate = useNavigate();

  

  const logoutHandler = async () => {
    try {
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
      toast.success(t("logoutSuccess"));
      navigate("/");
    } catch (error) {
      toast.error(t("logoutFailed"));
    }
  };

  useEffect(() => {
    api.get("/categories")
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error("Erreur catégories", err));
  }, []);

  return (
    <div className="dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 z-10">
      {/* Main Navbar */}
      <div className="h-20">
        <div className="max-w-8xl mx-auto flex justify-between items-center h-full px-6 gap-3 ">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <h1 className="font-extrabold text-xl text-gray-800 dark:text-white">
                <span className="relative inline-block">
                  {t("logo")}
                  <GraduationCap
                    size={16}
                    className="absolute -top-2 left-0.5 text-indigo-500 dark:text-indigo-500"
                  />
                </span>
              </h1>
            </Link>
          </div>

          {/* Middle - Explore + Search Bar */}
          <div className="flex items-center w-full px-4 gap-x-6">
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
            <div className="max-w-xl w-full">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  className="pl-10 pr-4 py-6 w-full rounded-full border border-gray-300 dark:border-gray-700 focus-visible:ring-offset-0 focus:ring-blue-500 hover:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-7">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-sm font-extralight hover:text-blue-500 focus:outline-none flex items-center gap-2">
                  {language === "fr" ? "🇫🇷" : "🇬🇧"}
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

            <Link
              to="/cart"
              className="text-sm font-extralight hover:text-blue-500 flex items-center gap-2"
            >
              <ShoppingCart size={18} strokeWidth={1} />
              
            </Link>

            <Link
              to="/notifications"
              className="text-sm font-normal hover:text-blue-500 flex items-center"
            >
              <Bell size={18} strokeWidth={1} />
            
            </Link>

            <DarkMode />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer h-10 w-10">
                    <AvatarFallback className="text-lg font-semibold">
                      {user?.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>{user?.username || t("profile")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full">
                        {t("profile")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>
                      {t("logout")}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  {t("login.title")}
                </Button>
                <Button onClick={() => navigate("/login")}>
                  {t("signup.title")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Separator line */}
      <div className="dark:bg-gray-800 bg-gray-200" style={{ height: "1px" }}></div>

      {/* Sous-navbar */}
      <div className="dark:bg-[#020817] bg-white border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-12 gap-8">
            <Link
              to="/homeSudent"
              className="text-sm font-extralight hover:text-blue-500 text-primary transition-colors flex items-center gap-2"
            >
              {t("home")}
            </Link>
            <Link
              to="/my-learning"
              className="text-sm font-extralight hover:text-blue-500"
            >
              {t("myLearning")}
            </Link>
            <Link
              to="/community"
              className="text-sm font-extralight hover:text-blue-500"
            >
              {t("community")}
            </Link>
            <Link
              to="/become-instructor"
              className="text-sm font-extralight hover:text-blue-500"
            >
              {t("becomeInstructor")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarEtudiant;
