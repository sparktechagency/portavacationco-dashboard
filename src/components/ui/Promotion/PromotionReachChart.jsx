import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 4800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    uv: 5490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
    uv: 2490,
    pv: 3300,
    amt: 2100,
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const PromotionReachChart = () => {
  return (
    <div className="bg-white p-5 border rounded-2xl">
      <h1 className="font-bold text-xl mb-5">Promotion Reach</h1>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={15}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar className="rounded-2xl" dataKey="pv" fill="#FFD900" />
          <Bar className="rounded-2xl" dataKey="uv" fill="#FFBB00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PromotionReachChart;
