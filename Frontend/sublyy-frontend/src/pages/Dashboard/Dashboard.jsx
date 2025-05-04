import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { CreditCard, Calendar, Bell, TrendingUp, Plus, BarChart2 } from "lucide-react";
import { getSubscriptions, getSubscriptionAnalytics } from "../../services/api";
import SubscriptionCategoryChart from "../../components/charts/SubscriptionCategoryChart";
import { Currency } from "../../components/ui/Currency";

// Helper to estimate annual cost based on billing cycle
function getAnnualizedAmount(sub) {
  if (sub.billingCycle === "monthly") return (sub.price || 0) * 12;
  if (sub.billingCycle === "yearly") return sub.price || 0;
  if (sub.billingCycle === "weekly") return (sub.price || 0) * 52;
  // For custom, fallback to monthly * 12
  return (sub.price || 0) * 12;
}

function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [monthlySpend, setMonthlySpend] = useState(0);
  const [annualSpend, setAnnualSpend] = useState(0);
  const [renewalSoonCount, setRenewalSoonCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState([]);

  const displayName = user?.username || user?.displayName || user?.name || user?.email?.split("@")[0] || "User";

  useEffect(() => {
    // Fetch all subscriptions
    setLoading(true);
    Promise.all([
      getSubscriptions()
        .then((data) => {
          const subs = data.subscriptions || [];
          setSubscriptions(subs);

          // Calculate annual spend
          let annual = 0;
          subs.forEach((sub) => {
            annual += getAnnualizedAmount(sub);
          });
          setAnnualSpend(annual);

          // Calculate renewal soon (within 7 days)
          const now = new Date();
          const soon = subs.filter((sub) => {
            if (!sub.nextPaymentDate) return false;
            const next = new Date(sub.nextPaymentDate);
            const diff = (next - now) / (1000 * 60 * 60 * 24);
            return diff >= 0 && diff <= 7;
          });
          setRenewalSoonCount(soon.length);
        })
        .catch(err => {
          console.error("Error fetching subscriptions:", err);
          setError("Failed to load subscriptions. Please try again later.");
        }),
      
      // Fetch monthly spend from analytics endpoint
      getSubscriptionAnalytics()
        .then((analytics) => {
          setMonthlySpend(analytics?.total || 0);
          setCategoryData(analytics?.categoryDistribution || []);
        })
        .catch(err => {
          console.error("Error fetching analytics:", err);
          // Don't set an error, just log it as this is secondary data
        })
    ])
    .finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-indigo-600 text-xl">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center">
          <div className="text-xl font-semibold mb-2">Error</div>
          <div>{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {displayName}
          </h1>
          <p className="text-gray-600 mt-1">
            Here's an overview of your subscriptions
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/add-subscription")}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:from-purple-600 hover:to-indigo-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <Plus size={20} />
          Add Subscription
        </button>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Monthly Spending</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-800"><Currency amount={monthlySpend} /></h3>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <CreditCard className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Annual Spending</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-800">${annualSpend.toFixed(2)}</h3>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Calendar className="text-green-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Active Subscriptions</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-800">{subscriptions.length}</h3>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Bell className="text-purple-500" size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">Renewal Soon</p>
              <h3 className="text-2xl font-bold mt-1 text-gray-800">{renewalSoonCount}</h3>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <TrendingUp className="text-orange-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Subscriptions</h2>
        <div className="border border-indigo-100 rounded-lg overflow-hidden">
          {subscriptions.length === 0 ? (
            <div className="min-h-[200px] flex items-center justify-center">
              <p className="text-gray-500">
                You'll see your subscriptions here once you add them
              </p>
            </div>
          ) : (
            <div className="divide-y divide-indigo-50">
              {subscriptions.map((sub) => (
                <div
                  key={sub._id}
                  className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0 justify-between px-6 py-4 hover:bg-indigo-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="w-4 h-4 rounded-full border border-indigo-200"
                      style={{ background: sub.color }}
                    />
                    <div>
                      <div className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">{sub.name}</div>
                      <div className="text-xs text-gray-400">{sub.category} &middot; {sub.billingCycle}</div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 text-sm">
                    <span className="text-indigo-600 font-semibold">${sub.price.toFixed(2)}</span>
                    <span className="text-gray-500">
                      Next: {new Date(sub.nextPaymentDate).toLocaleDateString()}
                    </span>
                    <span className="text-gray-400">{sub.paymentMethod}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Category Distribution Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Monthly Spending by Category</h2>
          <div className="p-2 bg-indigo-50 rounded-lg">
            <BarChart2 className="text-indigo-600" size={24} />
          </div>
        </div>
        <SubscriptionCategoryChart categoryData={categoryData} />
      </div>
    </div>
  );
}

export default Dashboard;