import React from "react";
import { NavBar } from "@/components/NavBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8 relative">
        {children}
      </main>
      <footer className="py-6 border-t-4 border-neo-black bg-neo-black text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-neo-gray">IPL 2024 Analytics Dashboard</p>
          <p className="text-xs mt-2 text-neo-gray/60">
            Created with Love by Krunal Pokar❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
