import React from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  Mail, 
  Info, 
  GraduationCap, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Copyright
} from "lucide-react";

const Footer = ({ className = "" }) => {
  return (
    <footer className={`bg-secondary w-full py-12 ${className}`}>
      <div className="px-[calc(170px+2rem)] lg:pl-[170px]"> 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <h2 className="font-extrabold text-xl text-gray-800 dark:text-white">
              <span className="relative inline-block">
                Madrassa
                <GraduationCap
                  size={14}
                  className="absolute -top-2 left-0.5 text-indigo-500 dark:text-indigo-500"
                />
              </span>
            </h2>
            <p className="text-muted-foreground">
              Votre partenaire dans l'apprentissage en ligne, offrant des cours de qualité pour tous les niveaux.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Home size={16} />
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Mail size={16} />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/About" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Info size={16} />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/formateur" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <GraduationCap size={16} />
                  <span>Devenir Formateur</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} />
                <span>contact@madrassa.fr</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone size={16} />
                <span>+212 6 08 81 91 91</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 flex justify-center items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Copyright size={16} />
            <span>
              {new Date().getFullYear()}{" "}
              <span className="relative inline-block">
                Madrassa
                <GraduationCap
                  size={12}
                  className="absolute -top-2 left-0.5 text-indigo-500 dark:text-indigo-500"
                />
              </span>
              . Tous droits réservés.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
