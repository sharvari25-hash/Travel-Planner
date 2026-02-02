
import React from 'react';
import { myTrips } from '../lib/my-trips';
import { Link } from 'react-router-dom';
import { FaPlaneDeparture, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

const MyTrips = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Upcoming':
        return <FaPlaneDeparture className="text-blue-500" />;
      case 'Completed':
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaHourglassHalf className="text-yellow-500" />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Trips</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myTrips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2">
              <div className="relative">
                <img src={trip.imageUrl} alt={trip.destination} className="w-full h-56 object-cover" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700 flex items-center">
                  {getStatusIcon(trip.status)}
                  <span className="ml-2">{trip.status}</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{trip.destination}</h2>
                <p className="text-gray-600 mb-4">{trip.startDate} to {trip.endDate}</p>
                <div className="flex items-center mb-4">
                  <span className="text-gray-700 font-semibold mr-2">Collaborators:</span>
                  <div className="flex -space-x-2">
                    {trip.collaborators.map((c) => (
                      <img key={c.id} src={c.avatarUrl} alt={c.name} className="w-8 h-8 rounded-full border-2 border-white" />
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                    <div className='flex justify-between'>
                        <span className="text-sm font-semibold text-gray-600">Budget</span>
                        <span className="text-sm font-bold text-gray-800">${trip.budget.spent} / ${trip.budget.total}</span>
                    </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(trip.budget.spent / trip.budget.total) * 100}%` }}></div>
                  </div>
                </div>
                <Link to={`/dashboard/my-trips/${trip.id}`} className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
