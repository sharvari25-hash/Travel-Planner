import React, { useMemo, useState } from 'react';
import { myTrips } from '../lib/my-trips';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaCheckCircle, FaHourglassHalf, FaPlaneDeparture, FaUsers } from 'react-icons/fa';
import TravelerSidebar from '../components/dashboard/traveler/TravelerSidebar';
import TravelerHeader from '../components/dashboard/traveler/TravelerHeader';

const statusStyles = {
  Upcoming: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
};

const getStatusIcon = (status) => {
  if (status === 'Upcoming') {
    return <FaPlaneDeparture className="text-blue-500" />;
  }

  if (status === 'Completed') {
    return <FaCheckCircle className="text-green-500" />;
  }

  return <FaHourglassHalf className="text-yellow-500" />;
};

const formatDate = (dateValue) =>
  new Date(dateValue).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const MyTrips = ({ statusFilter = 'All' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('startDateDesc');

  const filteredTrips = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const base = myTrips.filter((trip) => {
      const matchesStatus = statusFilter === 'All' || trip.status === statusFilter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        trip.destination.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });

    const sorted = [...base];

    if (sortBy === 'startDateAsc') {
      sorted.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }

    if (sortBy === 'startDateDesc') {
      sorted.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    }

    if (sortBy === 'budgetHigh') {
      sorted.sort((a, b) => b.budget.total - a.budget.total);
    }

    return sorted;
  }, [searchTerm, sortBy, statusFilter]);

  const summary = useMemo(
    () => ({
      total: myTrips.length,
      upcoming: myTrips.filter((trip) => trip.status === 'Upcoming').length,
      completed: myTrips.filter((trip) => trip.status === 'Completed').length,
      spent: myTrips.reduce((sum, trip) => sum + trip.budget.spent, 0),
    }),
    []
  );

  return (
    <div className="flex h-screen bg-[#F3F6FD] font-sans overflow-hidden">
      <TravelerSidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <TravelerHeader />
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Trips</h1>
            <p className="text-sm text-gray-500 mt-1">
              Track your itineraries, collaborators, and trip budgets in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-gray-400">Total Trips</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{summary.total}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-gray-400">Upcoming</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">{summary.upcoming}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-green-700 mt-1">{summary.completed}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-gray-400">Total Spent</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">${summary.spent}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by destination"
                className="w-full md:flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="startDateDesc">Latest Start Date</option>
                <option value="startDateAsc">Earliest Start Date</option>
                <option value="budgetHigh">Highest Budget</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => (
              <article
                key={trip.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img src={trip.imageUrl} alt={trip.destination} className="w-full h-48 object-cover" />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                        statusStyles[trip.status] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {getStatusIcon(trip.status)}
                      {trip.status}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-800">{trip.destination}</h2>

                  <div className="mt-3 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUsers className="text-gray-400" />
                      <span>{trip.collaborators.length} collaborators</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-gray-500">Budget Used</span>
                      <span className="font-semibold text-gray-700">
                        ${trip.budget.spent} / ${trip.budget.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${Math.min(100, (trip.budget.spent / trip.budget.total) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/user/dashboard/my-trips/${trip.id}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-5 text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredTrips.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-sm text-gray-500">
              No trips found for this view.
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default MyTrips;
