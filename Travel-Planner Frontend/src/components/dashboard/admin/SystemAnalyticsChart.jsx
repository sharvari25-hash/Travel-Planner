import React from 'react';

const data = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 600 },
  { name: 'Apr', users: 800 },
  { name: 'May', users: 500 },
  { name: 'Jun', users: 700 },
];

const SystemAnalyticsChart = () => {
  const maxValue = Math.max(...data.map(d => d.users));
  
  return (
    <div className="h-80 w-full p-4">
      <svg width="100%" height="100%" viewBox="0 0 500 300">
        {/* Y-axis lines */}
        {[...Array(5)].map((_, i) => (
          <g key={i}>
            <line
              x1="30"
              y1={250 - (i * 50)}
              x2="480"
              y2={250 - (i * 50)}
              stroke="#e0e0e0"
              strokeWidth="1"
            />
            <text x="25" y={255 - (i * 50)} textAnchor="end" fontSize="12" fill="#9e9e9e">
              {((maxValue / 4) * i).toFixed(0)}
            </text>
          </g>
        ))}

        {/* X-axis */}
        <line x1="30" y1="250" x2="480" y2="250" stroke="#bdbdbd" strokeWidth="2" />

        {/* Bars and labels */}
        {data.map((d, i) => {
          const barHeight = (d.users / maxValue) * 220;
          return (
            <g key={d.name}>
              <rect
                x={50 + i * 70}
                y={250 - barHeight}
                width="40"
                height={barHeight}
                fill="#6A487A"
                rx="4"
              />
              <text x={70 + i * 70} y="270" textAnchor="middle" fontSize="12" fill="#616161">
                {d.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SystemAnalyticsChart;
