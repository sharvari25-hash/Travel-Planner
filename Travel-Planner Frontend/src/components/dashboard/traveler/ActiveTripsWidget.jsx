import React from 'react';
import StatCard from './StatCard';
import { FaSuitcase } from 'react-icons/fa';

const activeTrips = [
  { city: 'Tokyo', dates: 'Apr 25 - Apr 30' },
  { city: 'Paris', dates: 'Jun 10 - Jun 18' }
];

const ActiveTripsWidget = () => (
  <StatCard>
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2 text-blue-600 font-bold">
        <FaSuitcase /> Active Trips
      </div>
      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded font-bold">50</span>
    </div>
    <div className="space-y-3 mt-1">
      {activeTrips.map((trip, i) => (
        <div key={i} className="flex justify-between text-sm">
          <span className="font-bold text-gray-700">{trip.city}</span>
          <span className="text-gray-400 text-xs">{trip.dates}</span>
        </div>
      ))}
    </div>
  </StatCard>
);

export default ActiveTripsWidget;