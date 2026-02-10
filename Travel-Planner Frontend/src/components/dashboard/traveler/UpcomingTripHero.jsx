import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaPlane, FaSuitcase, FaWallet } from 'react-icons/fa';
import { formatInr } from '../../../lib/pricing';

const formatDateLabel = (value) => {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return '--';
  }

  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const UpcomingTripHero = ({ upcomingTrip }) => {
  if (!upcomingTrip) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="lg:col-span-2 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm min-h-[500px] flex flex-col justify-center"
      >
        <h2 className="text-3xl font-bold text-gray-800">No Upcoming Trip</h2>
        <p className="text-gray-500 mt-2">
          Start a new journey from the tours page and your next trip will appear here.
        </p>
        <Link
          to="/tours"
          className="mt-6 inline-flex w-max items-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Explore Tours
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-sm group min-h-[500px]"
    >
      <img
        src={upcomingTrip.imageUrl}
        alt={`${upcomingTrip.destination}, ${upcomingTrip.country}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70"></div>

      <div className="absolute top-8 left-8 text-white">
        <h2 className="text-3xl font-bold">
          {upcomingTrip.destination}, {upcomingTrip.country}
        </h2>
        <div className="flex items-center gap-2 mt-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-max">
          <FaCalendarAlt className="text-sm" />
          <span className="text-sm font-medium">
            {upcomingTrip.daysLeft} {upcomingTrip.daysLeft === 1 ? 'Day' : 'Days'} Left
          </span>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Booking</p>
            <p className="text-lg font-bold text-gray-800">{upcomingTrip.bookingId}</p>
            <p className="text-sm text-gray-500 mt-1">Status: {upcomingTrip.bookingStatus}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Travel Dates</p>
            <p className="text-lg font-bold text-gray-800">
              {formatDateLabel(upcomingTrip.startDate)} - {formatDateLabel(upcomingTrip.endDate)}
            </p>
            <p className="text-sm text-gray-500 mt-1">Transport: {upcomingTrip.transportation}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 border-t pt-5">
          <Link
            to={`/user/dashboard/my-trips/${upcomingTrip.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-lg shadow-blue-200"
          >
            View Itinerary
          </Link>
          <Link
            to="/user/dashboard/my-trips"
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors"
          >
            <FaSuitcase size={12} /> My Trips
          </Link>
          <div className="bg-blue-50 text-blue-600 px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
            <FaPlane size={12} /> {upcomingTrip.status}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-2">
          <div className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <FaWallet /> Budget
          </div>
          <span className="text-xl font-bold text-gray-800">
            {formatInr(upcomingTrip.spentBudget)} / {formatInr(upcomingTrip.totalBudget)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default UpcomingTripHero;
