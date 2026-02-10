import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { FaMapMarkerAlt, FaPlus } from 'react-icons/fa';

const formatDateLabel = (value) => {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return '--';
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const BudgetSummaryWidget = ({ activities = [] }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-gray-800">Budget Summary</h3>
      <span className="text-xs text-blue-500 cursor-pointer font-medium flex items-center gap-1">
        View <IoIosArrowForward />
      </span>
    </div>

    <div className="space-y-4">
      {activities.length === 0 ? (
        <p className="text-sm text-gray-400">No upcoming activities found.</p>
      ) : activities.map((activity) => (
        <div key={`${activity.day}-${activity.title}`} className="flex gap-3 items-center group cursor-pointer">
          <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm">
            D{activity.day}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              {activity.title}
            </h4>
            <div className="text-[10px] text-gray-400 mt-0.5">{formatDateLabel(activity.date)}</div>
            <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
              <FaMapMarkerAlt size={8} /> {activity.location}
            </div>
          </div>
        </div>
      ))}
    </div>

    <button className="w-full mt-5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
      <FaPlus size={10} /> Add Activity
    </button>
  </div>
);

export default BudgetSummaryWidget;
