import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { FaMapMarkerAlt, FaPlus } from 'react-icons/fa';

const budgetActivities = [
  { name: 'Tokyo Skytree Tour', date: 'April 27, 2:00 PM', location: 'Tokyo, Japan', img: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=150&q=80' },
  { name: 'Mount Fuji Day Trip', date: 'April 28, 8:00 AM', location: 'Mount Fuji, Japan', img: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=150&q=80' }
];

const BudgetSummaryWidget = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-4">
       <h3 className="font-bold text-gray-800">Budget Summary</h3>
       <span className="text-xs text-blue-500 cursor-pointer font-medium flex items-center gap-1">View <IoIosArrowForward /></span>
     </div>

     <div className="space-y-4">
        {budgetActivities.map((activity, i) => (
          <div key={i} className="flex gap-3 items-center group cursor-pointer">
             <img src={activity.img} alt="" className="w-12 h-12 rounded-lg object-cover" />
             <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{activity.name}</h4>
                <div className="text-[10px] text-gray-400 mt-0.5">{activity.date}</div>
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