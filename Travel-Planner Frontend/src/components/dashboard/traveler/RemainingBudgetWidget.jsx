import React from 'react';
import StatCard from './StatCard';
import { FaWallet } from 'react-icons/fa';
import { formatInr } from '../../../lib/pricing';

const RemainingBudgetWidget = () => (
  <StatCard>
     <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
        <FaWallet /> Remaining Budget
     </div>
     <h3 className="text-3xl font-bold text-gray-800">{formatInr(182500)}</h3>
     <div className="w-full bg-gray-100 rounded-full h-2 mt-3 overflow-hidden">
       <div className="bg-blue-500 h-2 rounded-full w-[70%]"></div>
     </div>
  </StatCard>
);

export default RemainingBudgetWidget;
