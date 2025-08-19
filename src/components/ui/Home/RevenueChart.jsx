"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Aug", uv: 3200, pv: 5400, amt: 2300 },
  { name: "Sep", uv: 2100, pv: 6800, amt: 2400 },
  { name: "Oct", uv: 2800, pv: 8200, amt: 2600 },
  { name: "Nov", uv: 3500, pv: 9500, amt: 2800 },
  { name: "Dec", uv: 4200, pv: 10900, amt: 3000 },
];

const RevenueChart = () => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#131B4D]">
          Revenue Overview
        </h2>
        <span className="text-sm text-gray-500">Monthly</span>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="uv"
              barSize={60}
              fill="#3B4CD4"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
