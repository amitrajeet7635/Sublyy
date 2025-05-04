import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";

const SubscriptionCategoryChart = ({ categoryData }) => {
  // If no data or empty array, show placeholder
  if (!categoryData || categoryData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-400">No category data available</p>
      </div>
    );
  }

  // Sort categories by amount for better visualization
  const sortedData = [...categoryData].sort((a, b) => b.amount - a.amount);

  // Generate gradient colors for each bar
  const getGradientColors = (index) => {
    const gradients = [
      ['#8b5cf6', '#c084fc'], // Purple gradient
      ['#6366f1', '#818cf8'], // Indigo gradient
      ['#3b82f6', '#60a5fa'], // Blue gradient
      ['#06b6d4', '#22d3ee'], // Cyan gradient
      ['#10b981', '#34d399'], // Green gradient
      ['#f59e0b', '#fbbf24'], // Amber gradient
      ['#ef4444', '#f87171'], // Red gradient
      ['#ec4899', '#f472b6'], // Pink gradient
    ];
    return gradients[index % gradients.length];
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium">{payload[0].payload.category}</p>
          <p className="text-indigo-600 font-bold">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 40, bottom: 10 }}
        >
          <defs>
            {sortedData.map((entry, index) => {
              const [startColor, endColor] = getGradientColors(index);
              return (
                <linearGradient key={`gradient-${index}`} id={`colorGradient${index}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={startColor} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={endColor} stopOpacity={0.8} />
                </linearGradient>
              );
            })}
          </defs>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" opacity={0.5} />
          <XAxis 
            type="number"
            tickFormatter={(value) => `$${value}`} 
            tick={{ fill: "#4b5563", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis 
            dataKey="category"
            type="category"
            tick={{ fill: "#4b5563", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
            width={100}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="amount" 
            radius={[0, 4, 4, 0]}
            barSize={24}
          >
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#colorGradient${index})`} />
            ))}
            <LabelList 
              dataKey="amount" 
              position="right" 
              formatter={(value) => `$${value.toFixed(2)}`}
              style={{ fill: "#4b5563", fontSize: 12, fontWeight: 500 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubscriptionCategoryChart;
