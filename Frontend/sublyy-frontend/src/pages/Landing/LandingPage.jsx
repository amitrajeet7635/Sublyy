import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  CheckCircle, ArrowRight, TrendingUp, Calendar, Zap,
  Film, Music, BookOpen, Briefcase, Play, Coffee, CreditCard,
  Repeat, Bell, PieChart, Sun, Moon, Menu, X, Rocket, Users, LightbulbIcon, Clock, Mail, Instagram, Twitter
} from "lucide-react";
import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

// Subscription categories with icons
const categories = [
  { name: "Entertainment", icon: <Film className="text-pink-400" size={24} /> },
  { name: "Music", icon: <Music className="text-purple-400" size={24} /> },
  { name: "Education", icon: <BookOpen className="text-blue-400" size={24} /> },
  { name: "Productivity", icon: <Briefcase className="text-yellow-400" size={24} /> },
  { name: "Streaming", icon: <Play className="text-red-400" size={24} /> },
  { name: "Lifestyle", icon: <Coffee className="text-green-400" size={24} /> },
];

const analyticsPieData = [
  { name: "Entertainment", value: 33 },
  { name: "Productivity", value: 15 },
  { name: "Other", value: 11 },
];
const analyticsPieColors = ["#a78bfa", "#818cf8", "#38bdf8"];

const analyticsBarData = [
  { month: "Jan", spend: 40 },
  { month: "Feb", spend: 52 },
  { month: "Mar", spend: 58 },
  { month: "Apr", spend: 62 },
  { month: "May", spend: 55 },
  { month: "Jun", spend: 59 },
];

const AnalyticsDashboard = () => (
  <div className="w-full flex flex-col lg:flex-row gap-8">
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-full max-w-xs mx-auto">
        <h4 className="text-center text-gray-700 font-semibold mb-2">Spending by Category</h4>
        <ResponsiveContainer width="100%" height={220}>
          <RePieChart>
            <Pie
              data={analyticsPieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={40}
              label
            >
              {analyticsPieData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={analyticsPieColors[idx % analyticsPieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </RePieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-2 text-xs">
          {analyticsPieData.map((entry, idx) => (
            <span key={entry.name} className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: analyticsPieColors[idx] }}></span>
              {entry.name}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-full max-w-xs mx-auto">
        <h4 className="text-center text-gray-700 font-semibold mb-2">Monthly Spend</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={analyticsBarData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="spend" fill="#818cf8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();

  // Animations based on scroll position
  const navbarOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

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
      <div className="bg-white min-h-screen text-gray-900 transition-colors duration-300">
        {/* Navbar */}
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
          <motion.div
            className="mx-auto px-6 transition-all duration-700 ease-in-out rounded-2xl max-w-5xl w-[90%] py-4 bg-gradient-to-r from-indigo-100/90 to-purple-100/80 shadow-lg"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.7
            }}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center space-x-2 z-10 group"
              >
                <motion.span
                  className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Sublyy
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
                </motion.span>
              </Link>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <div className="flex">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`relative mx-4 py-2 text-base font-medium text-gray-700 hover:text-purple-600 transition-colors duration-300 ${activeSection === item.id ? "text-purple-600" : ""
                        }`}
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <motion.span
                          className="absolute -bottom-0.5 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                          layoutId="navIndicator"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </a>
                  ))}
                </div>
                <div className="flex items-center space-x-3 pl-4 border-l border-indigo-200">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-base px-6 py-2.5 ml-1 rounded-xl flex items-center gap-2 transform transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-400/50"
                    >
                      Get Started
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </div>
              {/* Mobile Menu Button */}
              <div className="flex items-center space-x-3 md:hidden">
                <motion.button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2.5 rounded-full ${mobileMenuOpen
                      ? "bg-indigo-200"
                      : "bg-indigo-100 hover:bg-indigo-200"
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
                        <X size={24} className="text-purple-600" /> :
                        <Menu size={24} className="text-gray-700" />
                      }
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-24 left-4 right-4 z-40 md:hidden"
            >
              <motion.div
                className="mx-auto max-w-sm bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-indigo-200 overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.div
                  className="p-4 flex flex-col space-y-2"
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
                        className={`block py-4 px-5 rounded-xl text-base transition-all duration-300 ${activeSection === item.id
                            ? "bg-indigo-100 text-purple-600 font-medium"
                            : "hover:bg-indigo-100 text-gray-700"
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
                    className="pt-3 px-3"
                  >
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl w-full shadow-md hover:shadow-lg hover:shadow-indigo-400/50 transition-all text-base font-medium"
                    >
                      Get Started
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <motion.section
          className="relative pt-32 pb-24 overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-white via-indigo-50 to-purple-50 text-gray-900"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 -z-10">
            {/* Gradient background for light/dark mode */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50 to-purple-50 opacity-80 transition-colors duration-300"></div>
            {/* Animated circles */}
            <motion.div
              className="absolute top-20 right-[20%] w-64 h-64 rounded-full bg-blue-900/30 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 15]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
          </div>
          <div className="container mx-auto flex flex-col lg:flex-row items-center">
            {/* Left column */}
            <motion.div
              className="w-full lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-8 inline-flex items-center px-4 py-2 rounded-full border border-indigo-100 bg-white/70 shadow-sm">
                <span className="mr-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-indigo-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                <span className="text-sm font-medium text-gray-700">
                  Now Available
                </span>
              </div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight text-gray-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-gray-900">Your </span>
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">subscriptions</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-4 bg-indigo-200/50 rounded-sm -z-0"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  ></motion.span>
                </span>
                <span className="text-gray-900"> under control</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Track, analyze and optimize all your recurring expenses in one smart dashboard. Save time and money with Sublyy.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link
                  to="/login"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 px-8 py-4 font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                >
                  <span className="relative z-20 flex items-center">
                    <span>Get Started</span>
                    <motion.div
                      className="ml-2"
                      animate={{
                        x: [0, 5, 0]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5
                      }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </span>
                  <span className="absolute bottom-0 right-0 -mb-10 -mr-10 h-40 w-40 rounded-full bg-white/10 transition-all duration-700 group-hover:scale-150"></span>
                </Link>

                <a
                  href="#features"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-indigo-600 transition-colors duration-200 overflow-hidden border-2 border-indigo-200 rounded-lg hover:bg-indigo-50/50"
                >
                  <span className="relative z-10 flex items-center">
                    <span>See Features</span>
                    <motion.span
                      className="ml-2"
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Calendar size={18} />
                    </motion.span>
                  </span>
                </a>
              </motion.div>

              {/* Removed user element count and ratings section */}
            </motion.div>

            {/* Right side illustration */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                {/* Main dashboard mockup */}
                <motion.div
                  className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="border-b border-gray-100 bg-gray-50 px-4 py-2 flex items-center">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="mx-auto text-xs font-medium text-gray-500">
                      subscriptions.sublyy.app
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="col-span-2 h-24 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4">
                        <div className="h-4 w-28 bg-indigo-200 rounded mb-2"></div>
                        <div className="h-6 w-40 bg-indigo-400 rounded"></div>
                      </div>
                      <div className="h-24 bg-purple-50 rounded-lg p-4">
                        <div className="h-4 w-12 bg-purple-200 rounded mb-2"></div>
                        <div className="h-10 w-full bg-purple-300 rounded"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-50 border border-gray-100 rounded-lg p-3 flex items-center">
                          <div className="h-10 w-10 rounded-md bg-indigo-100 mr-3 flex items-center justify-center">
                            {[<Music size={20} className="text-indigo-500" />,
                            <Film size={20} className="text-purple-500" />,
                            <Coffee size={20} className="text-blue-500" />,
                            <BookOpen size={20} className="text-pink-500" />][i]}
                          </div>
                          <div>
                            <div className="h-3 w-16 bg-gray-200 rounded mb-1.5"></div>
                            <div className="h-3 w-12 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="h-32 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4">
                      <div className="h-4 w-24 bg-purple-200 rounded mb-3"></div>
                      <div className="flex gap-1 items-end h-16">
                        {[...Array(12)].map((_, i) => {
                          const height = `${30 + Math.random() * 50}%`;
                          return (
                            <div key={i} style={{ height }} className={`w-full rounded-t ${i % 3 === 0 ? 'bg-indigo-500/80' : 'bg-indigo-300/60'}`}></div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating cards */}
                <motion.div
                  className="absolute -right-4 -top-4 w-40 bg-white rounded-lg p-3 shadow-xl border border-gray-100"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center">
                    <Bell className="text-purple-500 mr-2" size={18} />
                    <div className="text-xs font-medium text-gray-800">Renewal Alert</div>
                  </div>
                  <div className="mt-2 text-[11px] text-gray-500">Netflix renews in 2 days</div>
                </motion.div>

                <motion.div
                  className="absolute -left-6 -bottom-10 w-44 bg-white rounded-lg p-3 shadow-xl border border-gray-100"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center">
                    <TrendingUp className="text-green-500 mr-2" size={18} />
                    <div className="text-xs font-medium text-gray-800">Monthly Summary</div>
                  </div>
                  <div className="mt-1">
                    <div className="flex justify-between items-center">
                      <div className="text-[11px] text-gray-500">Total</div>
                      <div className="text-xs text-white font-semibold">$58.99</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-[11px] text-gray-500">Saved</div>
                      <div className="text-xs font-semibold text-green-500">$12.99</div>
                    </div>
                  </div>
                </motion.div>

                {/* Visual decoration elements */}
                <div className="absolute -z-10 -left-10 -top-10 w-40 h-40 bg-gradient-to-br from-indigo-200 to-transparent rounded-full blur-2xl opacity-60"></div>
                <div className="absolute -z-10 -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-purple-200 to-transparent rounded-full blur-2xl opacity-60"></div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Dashboard Preview Section */}
        <section className="py-24 px-4 bg-white text-gray-900 transition-colors duration-300 overflow-hidden">
          <div className="container mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">Elegant Dashboard</span>
                <span className="text-gray-900"> Experience</span>
              </h2>
              <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                Seamlessly manage all your subscriptions with our intuitive and beautiful interface
              </p>
            </motion.div>
            <div className="relative">
              {/* Background elements */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                  className="absolute top-40 left-1/4 w-64 h-64 rounded-full bg-indigo-300/10 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                <motion.div
                  className="absolute bottom-20 right-1/4 w-72 h-72 rounded-full bg-purple-300/10 blur-3xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                ></motion.div>
              </div>

              {/* Main dashboard showcase cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Card 1: Subscription Overview */}
                <motion.div
                  className="bg-white backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100 overflow-hidden group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7 }}
                  whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.25)" }}
                >
                  <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-lg text-gray-900">
                        Monthly Summary
                      </h3>
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <PieChart className="text-indigo-600" size={22} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">Total Spend</span>
                          <span className="text-xl font-bold text-indigo-600">$58.99</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm p-3 border-b border-indigo-100">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                          <span className="text-gray-700">Entertainment</span>
                        </div>
                        <span className="font-medium text-indigo-700">$32.99</span>
                      </div>

                      <div className="flex items-center justify-between text-sm p-3 border-b border-indigo-100">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                          <span className="text-gray-700">Productivity</span>
                        </div>
                        <span className="font-medium text-purple-700">$15.00</span>
                      </div>

                      <div className="flex items-center justify-between text-sm p-3">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-gray-700">Other</span>
                        </div>
                        <span className="font-medium text-blue-700">$11.00</span>
                      </div>
                    </div>

                    <motion.div
                      className="mt-6 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg flex items-center justify-center font-medium cursor-pointer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>View Analytics</span>
                      <ArrowRight size={16} className="ml-2" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Card 2: Main Dashboard View */}
                <motion.div
                  className="bg-white backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100 overflow-hidden col-span-1 lg:col-span-1 lg:row-span-2 group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.25)" }}
                >
                  <div className="h-1.5 w-full bg-gradient-to-r from-purple-600 to-pink-600"></div>

                  <div className="p-4 border-b border-indigo-100 bg-indigo-50/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-400 mr-1.5"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400 mr-1.5"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <span className="text-xs font-medium text-gray-500">Dashboard</span>
                    </div>
                  </div>

                  <div className="relative p-6">
                    <div className="text-center">
                      <h3 className="font-bold text-gray-900 text-lg mb-6">Your Subscriptions</h3>

                      <div className="relative mx-auto w-48 h-48 mb-8">
                        <div className="absolute inset-0 rounded-full border-8 border-indigo-100"></div>
                        <svg className="absolute inset-0" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#312e81" strokeWidth="8" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#818cf8" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="50" transform="rotate(-90 50 50)" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-3xl font-bold text-indigo-600">7</span>
                          <span className="text-sm text-gray-500">Active</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-3 mb-6">
                        {[
                          <Music size={24} className="text-indigo-400" />,
                          <Film size={24} className="text-purple-400" />,
                          <Coffee size={24} className="text-blue-400" />,
                          <BookOpen size={24} className="text-pink-400" />
                        ].map((icon, i) => (
                          <motion.div
                            key={i}
                            className="p-3 bg-white rounded-lg flex items-center justify-center"
                            whileHover={{ y: -3, backgroundColor: '#f3f4f6' }}
                          >
                            {icon}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-[80%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>$0</span>
                        <span>Monthly Budget: $75.00</span>
                      </div>
                    </div>

                    <motion.div
                      className="mt-8 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg flex items-center justify-center font-medium cursor-pointer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Open Dashboard</span>
                      <ArrowRight size={16} className="ml-2" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Card 3: Upcoming Renewals */}
                <motion.div
                  className="bg-white backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100 overflow-hidden group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.25)" }}
                >
                  <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-lg text-gray-900">
                        Upcoming Renewals
                      </h3>
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="text-blue-600" size={22} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <motion.div
                        className="p-4 border border-red-200 bg-red-100 rounded-xl flex items-center"
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-2 bg-red-200 rounded-lg mr-4">
                          <Film className="text-red-600" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Netflix</p>
                          <p className="text-xs text-red-600">Renews in 2 days</p>
                        </div>
                        <div className="ml-auto font-bold text-gray-900">$17.99</div>
                      </motion.div>

                      <motion.div
                        className="p-4 border border-amber-200 bg-amber-100 rounded-xl flex items-center"
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-2 bg-amber-200 rounded-lg mr-4">
                          <Music className="text-amber-600" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Spotify</p>
                          <p className="text-xs text-amber-600">Renews in 5 days</p>
                        </div>
                        <div className="ml-auto font-bold text-gray-900">$9.99</div>
                      </motion.div>

                      <motion.div
                        className="p-4 border border-gray-200 bg-gray-100 rounded-xl flex items-center"
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-2 bg-gray-200 rounded-lg mr-4">
                          <BookOpen className="text-gray-600" size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Medium</p>
                          <p className="text-xs text-gray-600">Renews in 14 days</p>
                        </div>
                        <div className="ml-auto font-bold text-gray-900">$5.00</div>
                      </motion.div>
                    </div>

                    <motion.div
                      className="mt-6 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg flex items-center justify-center font-medium cursor-pointer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Manage Renewals</span>
                      <ArrowRight size={16} className="ml-2" />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Try it now button */}
              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <Link
                  to="/login"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  >
                    <Rocket size={20} className="mr-2" />
                  </motion.div>
                  Try the Dashboard Now
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 scroll-mt-20 bg-indigo-50 text-gray-900 transition-colors">
          <div className="container mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Your Subscriptions in One Place</h2>
              <p className="text-xl text-gray-500 max-w-3xl mx-auto">
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
                  className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-20 px-4 bg-purple-50 text-gray-900 scroll-mt-20 transition-colors">
          <div className="container mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Organize by Categories</h2>
              <p className="text-xl text-gray-500 max-w-3xl mx-auto">
                Group your subscriptions into customizable categories for better management
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg text-center transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-lg">
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-center mt-8 text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              And many more categories to organize your subscriptions...
            </motion.p>
          </div>
        </section>

        {/* Analytics Section */}
        <section id="analytics" className="py-24 px-4 scroll-mt-20 relative overflow-hidden bg-white text-gray-900 transition-colors">
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
              <p className="text-xl text-gray-500 max-w-3xl mx-auto">
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
                  <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 transition-colors p-6">
                    {/* --- Replace this block --- */}
                    {/* <img 
                      src="https://placehold.co/800x400/e2e8f0/a78bfa?text=Interactive+Analytics+Dashboard&font=montserrat" 
                      alt="Analytics Dashboard" 
                      className="w-full h-auto rounded-lg" 
                    /> */}
                    <AnalyticsDashboard />
                    {/* --- End replacement --- */}
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
                <p className="text-gray-500 mb-8">
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
                        <p className="text-gray-500">{item.description}</p>
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

        {/* CTA Section */}
        <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 text-gray-900">
          {/* Background gradient overlay - subtle gradient for light mode, deeper colors for dark mode */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-200 transition-colors -z-10"></div>

          {/* Abstract shapes - more subtle in light mode */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/40 rounded-full blur-3xl -z-5"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/40 rounded-full blur-3xl -z-5"></div>

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
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Be among the first to experience Sublyy
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      title: "Free to Start",
                      description: "Sign up now and begin tracking your subscriptions immediately",
                      icon: <Rocket className="text-indigo-600" size={24} />
                    },
                    {
                      title: "Premium Features",
                      description: "Access all the powerful tools to optimize your subscription spending",
                      icon: <Users className="text-indigo-600" size={24} />
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-indigo-200 shadow-sm transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="text-gray-900 font-medium text-lg">{feature.title}</h4>
                          <p className="text-gray-500">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-indigo-200 shadow-sm transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">Ready to get started?</p>
                        <p className="text-gray-500 text-sm">Create your account in minutes</p>
                      </div>
                      <Link
                        to="/login"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-400 transition-all"
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
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  Take control of your finances today
                </motion.h2>
                <motion.p
                  className="text-xl mb-10 text-gray-500 max-w-lg mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Sublyy helps you manage subscriptions efficiently with powerful tools and a beautiful interface.                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Get Started Now <ArrowRight className="ml-2" size={20} />
                  </Link>

                  <Link
                    to="#features"
                    className="inline-flex items-center justify-center border border-indigo-200 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </motion.div>

                <motion.div
                  className="mt-12 pt-8 border-t border-indigo-200 flex flex-wrap justify-center lg:justify-start gap-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="text-center flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-full">
                      <LightbulbIcon size={24} className="text-amber-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Smart Features</p>
                      <p className="text-gray-500 text-sm">AI-powered insights</p>
                    </div>
                  </div>
                  <div className="text-center flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-full">
                      <Calendar size={24} className="text-blue-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">No More Surprises</p>
                      <p className="text-gray-500 text-sm">Track renewal dates</p>
                    </div>
                  </div>
                  <div className="text-center flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-full">
                      <Clock size={24} className="text-green-500" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Available Now</p>
                      <p className="text-gray-500 text-sm">Start saving today</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 bg-white text-gray-500 border-t border-indigo-100 transition-colors">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand and copyright */}
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-1">
                Sublyy
              </span>
              <span className="text-sm text-gray-400">
                © {new Date().getFullYear()} Sublyy. All rights reserved.
              </span>
            </div>
            {/* Footer links */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <Twitter size={22} />
              </a>
              <a
                href="mailto:hello@sublyy.app"
                aria-label="Email"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <Mail size={22} />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <Instagram size={22} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
