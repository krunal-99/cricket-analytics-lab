
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BarChart2, Users, MapPin, TrendingUp, Calendar } from "lucide-react";

export const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: "Dashboard", path: "/", icon: <Calendar className="w-5 h-5 mr-2" /> },
    { name: "Teams", path: "/teams", icon: <Users className="w-5 h-5 mr-2" /> },
    { name: "Players", path: "/players", icon: <BarChart2 className="w-5 h-5 mr-2" /> },
    { name: "Venues", path: "/venues", icon: <MapPin className="w-5 h-5 mr-2" /> },
    { name: "Predictions", path: "/predictions", icon: <TrendingUp className="w-5 h-5 mr-2" /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-neo-yellow border-b-4 border-neo-black sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            <div className="bg-neo-black text-neo-yellow text-2xl font-black py-2 px-4 rotate-[-2deg]">
              IPL
            </div>
            <span className="text-neo-black font-black text-xl md:text-2xl tracking-tight">
              CRICKET ANALYTICS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 text-neo-black font-bold border-4 border-transparent ${
                  location.pathname === item.path 
                    ? "bg-neo-black text-neo-yellow -rotate-2" 
                    : "hover:border-neo-black hover:-rotate-2 transition-all"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden neo-button py-2 px-3"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="pt-2 pb-4 md:hidden border-t-4 border-neo-black animate-slide-up">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-neo-black font-bold ${
                  location.pathname === item.path 
                    ? "bg-neo-black text-neo-yellow -rotate-2" 
                    : ""
                } block mt-1`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
