import React, { useEffect, useState } from "react";
import { getSubscriptionAnalytics } from "../../services/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = [
  "#6366f1", "#a78bfa", "#f472b6", "#f59e42", "#34d399", "#60a5fa", "#fbbf24", "#f87171", "#818cf8"
];

const DashboardAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    getSubscriptionAnalytics()
      .then(setAnalytics)
      .catch(err => console.error("Error fetching analytics:", err));
  }, []);

  if (!analytics) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 mb-6">
        <div className="animate-pulse text-gray-400">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 mb-6 flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          This Month's Subscription Spend
        </h3>
        <div className="text-3xl font-bold text-indigo-600 mb-2">
          ${analytics.total?.toFixed(2) || '0.00'}
        </div>
        <div className="text-gray-500 text-sm">
          {!analytics.categoryDistribution || analytics.categoryDistribution.length === 0
            ? "No subscriptions due this month."
            : "Category-wise distribution:"}
        </div>
      </div>
      <div className="flex-1 min-w-[220px] max-w-xs w-full">
        {analytics.categoryDistribution && analytics.categoryDistribution.length > 0 && (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={analytics.categoryDistribution}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                label={({ category }) => category}
              >
                {analytics.categoryDistribution.map((entry, idx) => (
                  <Cell key={entry.category} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default DashboardAnalytics;