import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';  // Added missing import for Navbar component

const NavbarWrapper = () => {
  const location = useLocation();
  // Add the root path to pages without navbar
  const pathsWithoutNavbar = ['/', '/login', '/signup'];
  
  // Don't show navbar on home (landing) page, login page, or signup page
  if (pathsWithoutNavbar.includes(location.pathname)) {
    return null;
  }

  // Don't show navbar on dashboard pages as they have their own layout
  if (location.pathname.startsWith('/dashboard') || 
      location.pathname.startsWith('/reports') || 
      location.pathname.startsWith('/analytics') || 
      location.pathname.startsWith('/settings')) {
    return null;
  }

  // Show navbar on other pages
  return <Navbar />;
};

export default NavbarWrapper;
