import React from 'react';
import StatCard from './StatCard';
import { FaPlane } from 'react-icons/fa';

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

const UpcomingTripWidget = ({ upcomingTrip }) => (
  <StatCard>
    <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
      <FaPlane className="transform -rotate-45" /> Upcoming Trip
    </div>
    <div className="mt-2">
      {upcomingTrip ? (
        <>
          <h3 className="font-bold text-gray-800">
            {upcomingTrip.destination}, {upcomingTrip.country}
          </h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-gray-800">{upcomingTrip.daysLeft}</span>
            <span className="text-gray-500 text-sm">
              {upcomingTrip.daysLeft === 1 ? 'Day Left' : 'Days Left'}
            </span>
          </div>
          <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <span>{formatDateLabel(upcomingTrip.startDate)}</span>
            <span className="text-blue-400">to</span>
            <span>{formatDateLabel(upcomingTrip.endDate)}</span>
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-400">No upcoming trip found.</p>
      )}
    </div>
  </StatCard>
);

export default UpcomingTripWidget;
