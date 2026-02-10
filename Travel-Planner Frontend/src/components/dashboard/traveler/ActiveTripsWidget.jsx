import React from 'react';
import StatCard from './StatCard';
import { FaSuitcase } from 'react-icons/fa';

const formatDateLabel = (value) => {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return '--';
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const ActiveTripsWidget = ({ activeTrips = [], totalActive = 0 }) => (
  <StatCard>
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2 text-blue-600 font-bold">
        <FaSuitcase /> Active Trips
      </div>
      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded font-bold">
        {totalActive}
      </span>
    </div>
    <div className="space-y-3 mt-1">
      {activeTrips.length === 0 ? (
        <p className="text-sm text-gray-400">No active trips right now.</p>
      ) : activeTrips.map((trip) => (
        <div key={trip.id} className="flex justify-between text-sm">
          <span className="font-bold text-gray-700">{trip.destination}</span>
          <span className="text-gray-400 text-xs">
            {formatDateLabel(trip.startDate)} - {formatDateLabel(trip.endDate)}
          </span>
        </div>
      ))}
    </div>
  </StatCard>
);

export default ActiveTripsWidget;
