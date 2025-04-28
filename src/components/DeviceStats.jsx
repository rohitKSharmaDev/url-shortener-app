import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const COLORS = ['#0088FE', '#00C49f', '#FFBB28', '#FF8042'];

export default function DeviceStats({ stats }) {
  const deviceCount = stats.reduce((acc, curr) => {
    if(!acc[curr.device]) {
      acc[curr.device] = 0;
    } 

    acc[curr.device]++;
    return acc;

  }, {});

  const result = Object.keys(deviceCount).map((device) => ({
    device,
    count: deviceCount[device]
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart width={700} height={400}>
          <Pie
            data={result}
            labelLine={false}
            label={({device, percent}) => 
              `${device}: ${(percent * 100).toFixed(0)}%`}
            dataKey="count"
          >
            {
              result.map((_, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))
            }

          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
