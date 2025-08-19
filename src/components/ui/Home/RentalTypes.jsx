"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Car Rental", value: 53 },
  { name: "Vacation Homes", value: 29 },
  { name: "Golf Cart Rental", value: 21 },
];

const COLORS = ["#000C8A", "#9CB8FF", "#3B4CD4"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-[12px] font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const RentalTypes = () => {
  return (
    <div className="p-6 rounded-2xl shadow-md bg-white max-w-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-base text-[#131B4D]">Rental Types</h2>
      </div>

      {/* Pie Chart */}
      <div className="h-[175px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={85}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></div>
            <span className="text-sm text-gray-600">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalTypes;
