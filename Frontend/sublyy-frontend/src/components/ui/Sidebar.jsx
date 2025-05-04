import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, BarChart2, FileText, Settings, LogOut
} from "lucide-react";
import { AuthContext } from "../../context/authContext";
import { getSubscriptionAnalytics, getSubscriptionCount } from "../../services/api";

function Sidebar() {
  const location = useLocation();
  const { handleLogout } = useContext(AuthContext);
  const [sidebarData, setSidebarData] = useState({
    monthlySpend: 0,
    activeCount: 0,
    loading: true
  });

  // Fetch sidebar data
  useEffect(() => {
    Promise.all([
      getSubscriptionAnalytics(),
      getSubscriptionCount()
    ])
    .then(([analytics, count]) => {
      setSidebarData({
        monthlySpend: analytics.total || 0,
        activeCount: count,
        loading: false
      });
    })
    .catch(err => {
      console.error("Error fetching sidebar data:", err);
      setSidebarData(prev => ({ ...prev, loading: false }));
    });
  }, []);

  const navItems = [
    { icon: <Home size={20} />, name: "Dashboard", path: "/dashboard" },
    { icon: <BarChart2 size={20} />, name: "Analytics", path: "/analytics" },
    { icon: <FileText size={20} />, name: "Reports", path: "/reports" },
    { icon: <Settings size={20} />, name: "Settings", path: "/settings" }
  ];

  return (
    <div className="h-screen w-64 flex flex-col bg-gradient-to-b from-white via-indigo-50 to-purple-50 border-r border-indigo-100 shadow-lg">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-indigo-100 bg-white/80">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
            Sublyy
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200
                  ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 shadow"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-purple-700"
                  }
                `}
                style={{
                  boxShadow: location.pathname === item.path
                    ? "0 2px 8px 0 rgba(129, 140, 248, 0.08)"
                    : undefined
                }}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-t border-indigo-100 bg-white/80">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl shadow-sm">
          <h3 className="font-medium text-gray-700 mb-2">Subscription Summary</h3>
          
          {sidebarData.loading ? (
            <div className="space-y-2">
              <div className="h-4 bg-indigo-100 animate-pulse rounded"></div>
              <div className="h-4 bg-indigo-100 animate-pulse rounded"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Monthly</span>
                <span className="text-indigo-600 font-semibold">${sidebarData.monthlySpend.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Active</span>
                <span className="text-indigo-600 font-semibold">{sidebarData.activeCount} services</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* User Controls */}
      <div className="p-4 border-t border-indigo-100 bg-white/80">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-2 text-red-500 font-medium rounded-lg transition-all duration-200
            hover:bg-red-50 hover:text-red-700 hover:shadow"
        >
          <LogOut size={20} />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;