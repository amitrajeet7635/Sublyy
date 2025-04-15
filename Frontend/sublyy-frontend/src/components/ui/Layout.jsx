import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
  const [sidebarWidth, setSidebarWidth] = useState("240px");
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for theme preference
    const savedTheme = localStorage.getItem("landingTheme");
    return savedTheme === "dark";
  });
  
  const handleSidebarToggle = (isCollapsed) => {
    setSidebarWidth(isCollapsed ? "70px" : "240px");
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("landingTheme", "dark");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("landingTheme", "light");
    }
  };

  // Apply theme on component mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar onToggle={handleSidebarToggle} />
      
      {/* Main Content */}
      <div 
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Theme Toggle Button */}
        <div className="absolute top-4 right-6 z-10">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? 'dark' : 'light'}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 30, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? 
                  <Sun size={20} className="text-yellow-400" /> : 
                  <Moon size={20} className="text-indigo-700" />
                }
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
        
        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
