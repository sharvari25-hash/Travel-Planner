import React from 'react';
import StatCard from './StatCard';
import { FaPlane } from 'react-icons/fa';

const UpcomingTripWidget = () => (
  <StatCard>
     <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
        <FaPlane className="transform -rotate-45" /> Upcoming Trip
     </div>
     <div className="mt-2">
        <h3 className="font-bold text-gray-800">Tokyo, Japan</h3>
        <div className="flex items-baseline gap-2 mt-1">
           <span className="text-3xl font-bold text-gray-800">4</span>
           <span className="text-gray-500 text-sm">Days Left</span>
        </div>
        <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
          <span>LAX</span> <span className="text-blue-400">→</span> <span>HND</span>
        </div>
     </div>
  </StatCard>
);

export default UpcomingTripWidget;