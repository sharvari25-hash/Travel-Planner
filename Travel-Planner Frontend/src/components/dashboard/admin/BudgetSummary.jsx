import React from 'react';
import { FaChartBar, FaCog } from 'react-icons/fa';
import SectionTitle from '../shared/SectionTitle';
import { getPaymentHistory } from '../../../lib/paymentHistory';
import { formatInr } from '../../../lib/pricing';

const QUARTERLY_BUDGET_TARGET = 2400000;

const BudgetSummary = () => {
  const successfulRevenue = getPaymentHistory()
    .filter((entry) => entry.status === 'SUCCESS')
    .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);

  const remaining = Math.max(0, QUARTERLY_BUDGET_TARGET - successfulRevenue);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <SectionTitle title="Budget Summary" />
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Spent: {formatInr(successfulRevenue)}</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1">
            <FaChartBar /> View
          </button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Remaining: {formatInr(remaining)}</span>
          <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1">
            <FaCog /> Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
