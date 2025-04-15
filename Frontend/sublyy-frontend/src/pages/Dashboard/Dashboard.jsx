import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { motion } from "framer-motion";
import { BarChart3, ActivityIcon, Bell } from "lucide-react";

function Dashboard() {
  const { user } = useContext(AuthContext);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="container mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="text-3xl font-bold mb-6 text-gray-800 dark:text-white"
        variants={itemVariants}
      >
        Dashboard
      </motion.h1>
      
      {user && (
        <motion.div
          className="mb-8 p-6 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl shadow-md"
          variants={itemVariants}
        >
          <p className="text-xl font-medium text-purple-800 dark:text-purple-200">
            Welcome, <span className="font-bold">{user.username || user.email}</span>!
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Here's your activity overview for today.
          </p>
        </motion.div>
      )}
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        <motion.div 
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-purple-50 dark:border-purple-900/20"
          whileHover={{ y: -5 }}
          variants={itemVariants}
        >
          <div className="flex items-center mb-4">
            <BarChart3 className="mr-2 text-purple-600 dark:text-purple-400" size={24} />
            <h2 className="font-semibold text-lg text-gray-800 dark:text-white">Quick Stats</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300">Welcome to your dashboard!</p>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
              Last updated: Today
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-purple-50 dark:border-purple-900/20"
          whileHover={{ y: -5 }}
          variants={itemVariants}
        >
          <div className="flex items-center mb-4">
            <ActivityIcon className="mr-2 text-indigo-600 dark:text-indigo-400" size={24} />
            <h2 className="font-semibold text-lg text-gray-800 dark:text-white">Recent Activity</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300">No recent activity to display.</p>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              Check back soon!
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-purple-50 dark:border-purple-900/20"
          whileHover={{ y: -5 }}
          variants={itemVariants}
        >
          <div className="flex items-center mb-4">
            <Bell className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
            <h2 className="font-semibold text-lg text-gray-800 dark:text-white">Notifications</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300">You have no new notifications.</p>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              All caught up!
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;