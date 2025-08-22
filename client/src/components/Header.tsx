"use client";

import React from "react";
import { Menu, Search, User } from "lucide-react"; // Example icons

const Header: React.FC = () => {
  return (
    <header className="w-full h-20 flex items-center justify-between px-6 animate-gradient-wave bg-[length:200%_200%] text-white shadow-lg">
      {/* Left: Logo & Menu */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-white/10 transition">
          <Menu size={22} />
        </button>
        <h1 className="text-2xl font-bold">Cognify</h1>
      </div>

      {/* Middle: Search bar */}
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center w-1/3 bg-white/10 rounded-full px-4 py-2">
        <Search size={18} className="text-white/70" />
        <input
          type="text"
          placeholder="Search assignments..."
          className="bg-transparent outline-none text-lg px-2 w-full text-white placeholder-white/70"
        />
      </div>

      {/* Right: User profile */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-white/10 transition">
          <User size={22} />
        </button>
      </div>
    </header>
  );
};

export default Header;
