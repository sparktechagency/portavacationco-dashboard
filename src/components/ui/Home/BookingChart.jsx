"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", bookings: 4000 },
  { name: "Feb", bookings: 3000 },
  { name: "Mar", bookings: 2000 },
  { name: "Apr", bookings: 2780 },
  { name: "May", bookings: 1890 },
  { name: "Jun", bookings: 2390 },
  { name: "Jul", bookings: 3490 },
  { name: "Aug", bookings: 4300 },
  { name: "Sep", bookings: 2100 },
  { name: "Oct", bookings: 2800 },
  { name: "Nov", bookings: 3200 },
  { name: "Dec", bookings: 4200 },
];

const BookingChart = () => {
  return (
    <div
      style={{ width: "100%", height: 320 }}
      className="p-5 pb-14 rounded-2xl bg-white shadow-md"
    >
      <h2 style={{ marginBottom: 16 }}>Booking Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="bookings"
            stroke="#8884d8"
            fill="url(#fillGradient)"
          />
          <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#06127E" stopOpacity={1} />
            <stop offset="95%" stopColor="#06127E" stopOpacity={0} />
          </linearGradient>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingChart;
