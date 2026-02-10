
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { myTrips } from '../lib/my-trips';
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaDollarSign } from 'react-icons/fa';

const TripDetails = () => {
  const { id } = useParams();
  const trip = myTrips.find((t) => t.id === parseInt(id, 10));

  if (!trip) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Trip not found</h2>
          <Link to="/user/dashboard/my-trips" className="text-blue-600 hover:underline">
            &larr; Back to My Trips
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="relative h-80">
        <img src={trip.imageUrl} alt={trip.destination} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center">{trip.destination}</h1>
        </div>
        <div className="absolute top-4 left-4">
          <Link to="/user/dashboard/my-trips" className="flex items-center text-white bg-black/50 px-4 py-2 rounded-full hover:bg-black/75 transition-colors">
            <FaArrowLeft className="mr-2" />
            Back to Trips
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
              <FaMapMarkerAlt className="text-2xl text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">{trip.destination}</h2>
            </div>
            <div className="flex items-center text-gray-600 mb-6">
              <FaCalendarAlt className="mr-3" />
              <span>{trip.startDate} to {trip.endDate}</span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Itinerary</h3>
            <div className="space-y-4">
              {/* This is where a more detailed itinerary would go. For now, it's a placeholder. */}
              <div className="flex items-start">
                <div className="w-4 h-4 bg-blue-600 rounded-full mt-1.5 mr-4"></div>
                <p>Day 1: Arrival and check-in. Explore the local market.</p>
              </div>
              <div className="flex items-start">
                <div className="w-4 h-4 bg-blue-600 rounded-full mt-1.5 mr-4"></div>
                <p>Day 2: Guided city tour and museum visits.</p>
              </div>
               <div className="flex items-start">
                <div className="w-4 h-4 bg-blue-600 rounded-full mt-1.5 mr-4"></div>
                <p>Day 3: Day trip to a nearby landmark.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Budget & Collaborators */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><FaDollarSign className="mr-2 text-green-500"/>Budget Overview</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Spent:</span>
                <span className="font-bold text-lg text-red-500">${trip.budget.spent}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-lg text-green-500">${trip.budget.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full" style={{ width: `${(trip.budget.spent / trip.budget.total) * 100}%` }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><FaUsers className="mr-2 text-purple-500"/>Collaborators</h3>
              <div className="flex space-x-4">
                {trip.collaborators.map(c => (
                  <div key={c.id} className="text-center">
                    <img src={c.avatarUrl} alt={c.name} className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-purple-500"/>
                    <p className="text-gray-700">{c.name}</p>
                  </div>
                ))}
                 {trip.collaborators.length === 0 && <p className="text-gray-500">You're flying solo on this one!</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
