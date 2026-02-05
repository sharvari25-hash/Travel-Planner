import React from 'react';
import { FaChartBar, FaCog } from 'react-icons/fa';
import SectionTitle from '../shared/SectionTitle';

const BudgetSummary = () => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
    <SectionTitle title="Budget Summary" />
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <span className="text-gray-600">Spent: $4,200</span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1">
                <FaChartBar /> View
            </button>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-gray-600">Remaining: $1,800</span>
            <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1">
                <FaCog /> Edit
            </button>
        </div>
    </div>
  </div>
);

export default BudgetSummary;