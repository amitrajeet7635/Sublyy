import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, ArrowRight, TrendingUp, Calendar, Zap, 
  Film, Music, BookOpen, Briefcase, Play, Coffee, CreditCard,
  Repeat, Bell, PieChart, Sun, Moon, Menu, X, Rocket, Users, LightbulbIcon, Clock
} from "lucide-react";

// Subscription categories with icons
const categories = [
  { name: "Entertainment", icon: <Film className="text-pink-500" size={24} /> },
  { name: "Music", icon: <Music className="text-purple-500" size={24} /> },
  { name: "Education", icon: <BookOpen className="text-blue-500" size={24} /> },
  { name: "Productivity", icon: <Briefcase className="text-yellow-500" size={24} /> },
  { name: "Streaming", icon: <Play className="text-red-500" size={24} /> },
  { name: "Lifestyle", icon: <Coffee className="text-green-500" size={24} /> },
];

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for theme preference, default to light mode
    const savedTheme = localStorage.getItem("landingTheme");
    return savedTheme === "dark";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  
  // Animations based on scroll position
  const navbarOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  // Toggle theme function
  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    console.log("Toggling theme, new state:", newDarkMode ? "dark" : "light");
    
    // Update state
    setDarkMode(newDarkMode);
    
    // Apply immediately to DOM
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem("landingTheme", newDarkMode ? "dark" : "light");
  };

  // Apply theme on component mount
  useEffect(() => {
    // Apply theme based on state
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Track scroll for navbar background and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['features', 'categories', 'analytics'];
      let currentSection = 'home';
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section;
          }
        }
      });
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  
  // Navigation items for both desktop and mobile
  const navItems = [
    { id: 'features', label: 'Features' },
    { id: 'categories', label: 'Categories' },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Debug theme indicator */}
      <div 
        className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark p-2 rounded-lg text-xs shadow-lg opacity-50 hover:opacity-100 cursor-pointer"
        onClick={toggleTheme}
      >
        Theme: {darkMode ? 'Dark' : 'Light'} (Click to toggle)
      </div>
      
      <div className="bg-background-light dark:bg-background-dark min-h-screen">
        {/* Enhanced Navbar with rounded design and dissolve effects */}
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
          <motion.div
            className={`mx-auto px-3 transition-all duration-500 rounded-full ${
              scrolled 
                ? "py-1.5 backdrop-blur-lg bg-white/85 dark:bg-gray-900/85 shadow-lg dark:shadow-purple-500/5" 
                : "py-3 bg-white/25 dark:bg-gray-900/25 backdrop-blur-sm"
            }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20, 
              duration: 0.7 
            }}
          >
            <div className="flex items-center justify-between px-4">
              {/* Logo with subtle hover effect */}
              <Link 
                to="/" 
                className="flex items-center space-x-2 z-10 group"
              >
                <motion.span 
                  className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Sublyy
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
                </motion.span>
              </Link>
              
              {/* Desktop Navigation with active indicators */}
              <div className="hidden md:flex items-center gap-6">
                <div className="flex">
                  {navItems.map((item) => (
                    <a 
                      key={item.id}
                      href={`#${item.id}`} 
                      className={`relative mx-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 ${
                        activeSection === item.id ? "text-purple-600 dark:text-purple-400" : ""
                      }`}
                    >
                      {item.label}
                      {/* Animated underline indicator */}
                      {activeSection === item.id && (
                        <motion.span 
                          className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                          layoutId="navIndicator"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </a>
                  ))}
                </div>
                
                <div className="flex items-center space-x-1 pl-2 border-l border-gray-200 dark:border-gray-700">
                  {/* Theme Toggle Button with enhanced animation */}
                  <motion.button 
                    onClick={toggleTheme} 
                    className={`p-2 rounded-full transition-all duration-300 ${
                      darkMode 
                        ? "bg-gray-800 hover:bg-gray-700" 
                        : "bg-purple-50 hover:bg-purple-100"
                    }`}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Toggle theme"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={darkMode ? 'dark' : 'light'}
                        initial={{ rotate: -30, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 30, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {darkMode ? 
                          <Sun size={16} className="text-yellow-400" /> : 
                          <Moon size={16} className="text-indigo-700" />
                        }
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>
                  
                  {/* Get Started Button with enhanced effects */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/login" 
                      className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm px-4 py-1.5 ml-1 rounded-full flex items-center gap-2 transform transition-all duration-300 ${
                        scrolled 
                          ? "shadow hover:shadow-md hover:shadow-purple-500/20" 
                          : "shadow-md hover:shadow-lg hover:shadow-purple-500/30"
                      }`}
                    >
                      Get Started
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      >
                        <ArrowRight size={14} />
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Mobile Menu Button */}
              <div className="flex items-center space-x-2 md:hidden">
                <motion.button 
                  onClick={toggleTheme}
                  whileTap={{ scale: 0.9 }}
                  className={`p-1.5 rounded-full transition-all duration-300 ${
                    darkMode 
                      ? "bg-gray-800 hover:bg-gray-700" 
                      : "bg-purple-50 hover:bg-purple-100"
                  }`}
                  aria-label="Toggle theme"
                >
                  {darkMode ? 
                    <Sun size={16} className="text-yellow-400" /> : 
                    <Moon size={16} className="text-indigo-700" />
                  }
                </motion.button>
                
                <motion.button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.9 }}
                  className={`p-1.5 rounded-full ${
                    mobileMenuOpen
                      ? "bg-purple-100 dark:bg-gray-800" 
                      : "bg-white/70 dark:bg-gray-800/70 hover:bg-purple-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={mobileMenuOpen ? 'close' : 'open'}
                      initial={{ rotate: mobileMenuOpen ? -45 : 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: mobileMenuOpen ? 45 : -45, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {mobileMenuOpen ? 
                        <X size={20} className="text-purple-600 dark:text-purple-400" /> : 
                        <Menu size={20} className="text-gray-700 dark:text-gray-300" />
                      }
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Mobile Menu with animations - now as a floating rounded panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-16 left-4 right-4 z-40 md:hidden"
            >
              <motion.div 
                className="mx-auto max-w-sm bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.div 
                  className="p-4 flex flex-col space-y-1"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: { transition: { staggerChildren: 0.07 } },
                    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                  }}
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={{
                        open: { y: 0, opacity: 1 },
                        closed: { y: -20, opacity: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <a 
                        href={`#${item.id}`} 
                        onClick={closeMobileMenu} 
                        className={`block py-3 px-4 rounded-lg transition-all duration-300 ${
                          activeSection === item.id
                            ? "bg-purple-50 dark:bg-gray-800 text-purple-600 dark:text-purple-400" 
                            : "hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {item.label}
                      </a>
                    </motion.div>
                  ))}
                  <motion.div
                    variants={{
                      open: { y: 0, opacity: 1 },
                      closed: { y: -20, opacity: 0 }
                    }}
                    className="pt-2 px-2"
                  >
                    <Link 
                      to="/login" 
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg w-full shadow-md hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                    >
                      Get Started
                      <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Updated Hero Section for Light Mode */}
        <motion.section 
          className="pt-32 pb-24 px-4 relative overflow-hidden" 
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          {/* Background Blobs - lighter and more subtle colors for light mode */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-indigo-50/40 dark:bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-blue-50/40 dark:bg-indigo-200/30 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto text-center relative z-10">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-text-dark"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Take Control of Your <span className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-purple-600 dark:to-indigo-600 text-transparent bg-clip-text">Subscriptions</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-muted max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Manage, analyze, and optimize all your subscriptions in one place. 
              Never lose track of your recurring expenses again.
            </motion.p>
            <motion.div 
              className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link 
                to="/login" 
                className="flex items-center bg-indigo-600 dark:bg-gradient-to-r dark:from-purple-600 dark:to-indigo-600 text-white px-8 py-3 rounded-full hover:shadow-lg hover:shadow-indigo-300/40 dark:hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Managing Now <ArrowRight className="ml-2" size={20} />
              </Link>
              <a 
                href="#features" 
                className="flex items-center text-indigo-600 dark:text-gray-700 hover:text-indigo-800 dark:hover:text-purple-600 transition-colors"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* Dashboard Preview */}
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50 dark:from-white dark:to-purple-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-6xl mx-auto bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            >
              <div className="relative">
                <img 
                  src="https://placehold.co/1200x600/e2e8f0/a78bfa?text=Sublyy+Dashboard+Preview&font=montserrat" 
                  alt="Sublyy Dashboard" 
                  className="w-full h-auto rounded-t-3xl" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-t-3xl"></div>
              </div>
              <div className="p-8 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-800">Beautiful Dashboard Experience</h3>
                  <Link 
                    to="/login" 
                    className="text-purple-600 flex items-center hover:underline"
                  >
                    Try it now <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 scroll-mt-20 bg-white">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Your Subscriptions in One Place</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay on top of your recurring expenses with our comprehensive set of features
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <TrendingUp size={36} className="text-purple-600" />,
                  title: "Spending Analytics",
                  description: "Visualize your subscription spending with beautiful charts and insights"
                },
                {
                  icon: <Calendar size={36} className="text-indigo-600" />,
                  title: "Renewal Reminders",
                  description: "Never miss a renewal date with timely notifications and alerts"
                },
                {
                  icon: <Zap size={36} className="text-blue-600" />,
                  title: "Budget Optimization",
                  description: "Get smart recommendations to optimize your subscription spending"
                },
                {
                  icon: <CreditCard size={36} className="text-pink-600" />,
                  title: "Payment Tracking",
                  description: "Easily track all your subscription payments in one dashboard"
                },
                {
                  icon: <Repeat size={36} className="text-green-600" />,
                  title: "Renewal Forecasting",
                  description: "See upcoming renewals and plan your budget accordingly"
                },
                {
                  icon: <Bell size={36} className="text-yellow-600" />,
                  title: "Price Change Alerts",
                  description: "Get notified when subscription prices change to avoid surprises"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-20 px-4 bg-purple-50 scroll-mt-20">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Organize by Categories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Group your subscriptions into customizable categories for better management
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                </motion.div>
              ))}
            </div>

            <motion.p 
              className="text-center mt-8 text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              And many more categories to organize your subscriptions...
            </motion.p>
          </div>
        </section>

        {/* Redesigned Analytics Section */}
        <section id="analytics" className="py-24 px-4 scroll-mt-20 relative overflow-hidden bg-white">
          {/* Background decoration - lighter colors */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-50/50 to-transparent -z-10"></div>
          <div className="absolute top-40 left-20 w-64 h-64 rounded-full bg-indigo-50/30 blur-3xl -z-10"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-purple-50/30 blur-3xl -z-10"></div>
          
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">Smart Analytics</span> For Your Subscriptions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get comprehensive insights and save money with our powerful analytics tools
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left side: Chart & Interactive UI */}
              <motion.div 
                className="lg:col-span-7 relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative z-10">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Subscription Spending Overview</h3>
                        <div className="flex space-x-2">
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Monthly</span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Yearly</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <img 
                        src="https://placehold.co/800x400/e2e8f0/a78bfa?text=Interactive+Analytics+Dashboard&font=montserrat" 
                        alt="Analytics Dashboard" 
                        className="w-full h-auto rounded-lg" 
                      />
                      <div className="mt-6 grid grid-cols-3 gap-4">
                        <div className="bg-purple-50 p-4 rounded-lg text-center">
                          <p className="text-gray-500 text-sm">Monthly Spend</p>
                          <p className="text-2xl font-bold text-purple-600">$58.99</p>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-lg text-center">
                          <p className="text-gray-500 text-sm">Active Services</p>
                          <p className="text-2xl font-bold text-indigo-600">7</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <p className="text-gray-500 text-sm">Savings</p>
                          <p className="text-2xl font-bold text-blue-600">$12.50</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right side: Benefits */}
              <motion.div 
                className="lg:col-span-5"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Make smarter financial decisions</h3>
                <p className="text-gray-600 mb-8">
                  Our intelligent analytics help you understand your spending habits and identify opportunities to optimize your subscription costs.
                </p>
                
                <ul className="space-y-6">
                  {[
                    {
                      title: "Comprehensive Spending Analysis",
                      description: "Track and categorize all your subscription expenses in one dashboard",
                      icon: <PieChart className="text-purple-600" size={24} />
                    },
                    {
                      title: "Cost-Saving Recommendations",
                      description: "Get AI-powered suggestions to reduce your monthly bills",
                      icon: <TrendingUp className="text-indigo-600" size={24} />
                    },
                    {
                      title: "Smart Alerts & Notifications",
                      description: "Never miss a payment or be surprised by a price increase",
                      icon: <Bell className="text-blue-600" size={24} />
                    }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="mt-1 bg-purple-100 p-2 rounded-lg">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Link 
                    to="/login" 
                    className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Start Analyzing Now <ArrowRight className="ml-2" size={20} />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Redesigned CTA Section with pre-launch content */}
        <section className="py-24 px-4 relative overflow-hidden">
          {/* Background gradient overlay - subtle gradient for light mode, deeper colors for dark mode */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-indigo-600 dark:to-purple-800 -z-10"></div>
          
          {/* Abstract shapes - more subtle in light mode */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/40 dark:bg-white/10 rounded-full blur-3xl -z-5"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/40 dark:bg-white/10 rounded-full blur-3xl -z-5"></div>
          
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Early access side */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                  Be among the first to experience Sublyy
                </h3>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Early Access",
                      description: "Sign up now to be first in line when we launch",
                      icon: <Rocket className="text-indigo-600 dark:text-white" size={24} />
                    },
                    {
                      title: "Founding Member Benefits",
                      description: "Early users will receive exclusive features and perks",
                      icon: <Users className="text-indigo-600 dark:text-white" size={24} />
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/70 dark:bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-indigo-100 dark:border-white/20 shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-indigo-50 dark:bg-white/20 rounded-lg">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="text-gray-800 dark:text-white font-medium text-lg">{feature.title}</h4>
                          <p className="text-gray-600 dark:text-white/80">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <motion.div
                    className="bg-white/70 dark:bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-indigo-100 dark:border-white/20 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-gray-800 dark:text-white font-medium">Join our waitlist</p>
                        <p className="text-gray-600 dark:text-white/70 text-sm">Be notified when we launch</p>
                      </div>
                      <Link 
                        to="/login" 
                        className="bg-indigo-600 text-white dark:bg-white dark:text-purple-600 px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-purple-900/30 transition-all"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* CTA side */}
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  Take control of your finances today
                </motion.h2>
                <motion.p
                  className="text-xl mb-10 text-gray-600 dark:text-purple-100 max-w-lg mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  We're building Sublyy to help you manage subscriptions more efficiently. Join our pre-launch community today!
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Link 
                    to="/login" 
                    className="inline-flex items-center justify-center bg-indigo-600 text-white dark:bg-white dark:text-purple-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-purple-900/30 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Join Waitlist <ArrowRight className="ml-2" size={20} />
                  </Link>
                  
                  <Link 
                    to="#features" 
                    className="inline-flex items-center justify-center border border-indigo-200 dark:border-white/30 text-indigo-600 dark:text-white px-8 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-white/10 transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </motion.div>
                
                <motion.div
                  className="mt-12 pt-8 border-t border-indigo-100 dark:border-white/10 flex flex-wrap justify-center lg:justify-start gap-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="text-center flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 dark:bg-white/20 rounded-full">
                      <LightbulbIcon size={24} className="text-amber-500 dark:text-yellow-300" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800 dark:text-white">Smart Features</p>
                      <p className="text-gray-600 dark:text-white/70 text-sm">AI-powered insights</p>
                    </div>
                  </div>
                  <div className="text-center flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 dark:bg-white/20 rounded-full">
                      <Calendar size={24} className="text-blue-500 dark:text-blue-300" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800 dark:text-white">No More Surprises</p>
                      <p className="text-gray-600 dark:text-white/70 text-sm">Track renewal dates</p>
                    </div>
                  </div>
                  <div className="text-center flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 dark:bg-white/20 rounded-full">
                      <Clock size={24} className="text-green-500 dark:text-green-300" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800 dark:text-white">Launching Soon</p>
                      <p className="text-gray-600 dark:text-white/70 text-sm">Stay tuned!</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">Sublyy</h2>
                <p className="text-gray-600">Take control of your subscriptions</p>
              </div>
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <Link to="/login" className="text-gray-700 hover:text-purple-600 transition-colors">Sign In</Link>
                <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">Features</a>
                <a href="#categories" className="text-gray-700 hover:text-purple-600 transition-colors">Categories</a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Sublyy. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
