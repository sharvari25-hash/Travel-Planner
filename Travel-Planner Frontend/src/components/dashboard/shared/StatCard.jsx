import React from 'react';
import { cn } from '../../../lib/utils';

const StatCard = ({ title, value, icon, color = 'primary' }) => {
  const colorVariants = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-green-500/10 text-green-600',
    warning: 'bg-yellow-500/10 text-yellow-600',
    danger: 'bg-red-500/10 text-red-600',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6">
      <div className={cn("w-14 h-14 rounded-full flex items-center justify-center", colorVariants[color])}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
