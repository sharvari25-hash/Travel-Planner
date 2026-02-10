import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../../lib/AuthContext';
import { allToursData } from '../../../lib/AllToursData';

const getTourSlug = (tour) => tour.destination.toLowerCase().replace(/\s/g, '-');
const getTourKey = (tour) =>
  `${getTourSlug(tour)}-${tour.country.toLowerCase().replace(/\s/g, '-')}`;

const getCategoryFromRoute = (tab) => {
  if (tab === 'family') {
    return 'Family';
  }

  if (tab === 'couple') {
    return 'Couple';
  }

  if (tab === 'adventure') {
    return 'Adventure';
  }

  if (tab === 'culture') {
    return 'Culture';
  }

  return 'All';
};

const AdminTripsItinerariesPanel = () => {
  const { user } = useAuth();
  const { tab } = useParams();
  const isAdmin = user?.role === 'ADMIN';

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedTourKey, setSelectedTourKey] = useState('');

  const routeCategory = getCategoryFromRoute(tab);
  const activeCategoryFilter = routeCategory === 'All' ? categoryFilter : routeCategory;

  const summary = useMemo(() => {
    const totalTours = allToursData.length;
    const totalDays = allToursData.reduce((sum, entry) => sum + Number(entry.duration || 0), 0);
    const averageDuration = totalTours > 0 ? (totalDays / totalTours).toFixed(1) : '0.0';
    const uniqueCountries = new Set(allToursData.map((entry) => entry.country)).size;
    const categories = new Set(allToursData.map((entry) => entry.category)).size;

    return {
      totalTours,
      uniqueCountries,
      categories,
      averageDuration,
    };
  }, []);

  const filteredTours = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return allToursData.filter((entry) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        entry.destination.toLowerCase().includes(normalizedSearch) ||
        entry.country.toLowerCase().includes(normalizedSearch) ||
        entry.category.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        activeCategoryFilter === 'All' || entry.category === activeCategoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategoryFilter]);

  const selectedTour = useMemo(() => {
    if (filteredTours.length === 0) {
      return null;
    }

    return (
      filteredTours.find((entry) => getTourKey(entry) === selectedTourKey) ||
      filteredTours[0]
    );
  }, [filteredTours, selectedTourKey]);

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800">Trips & Itineraries</h3>
        <p className="text-sm text-gray-500 mt-2">
          Only users with the ADMIN role can manage tours and itineraries.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Trips & Itineraries</h1>
        <p className="text-sm text-gray-500 mt-1">
          Synced with existing tour mock data. Browse tours and review day-by-day plans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Total Tours</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{summary.totalTours}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Countries</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{summary.uniqueCountries}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Categories</p>
          <p className="text-2xl font-bold text-green-700 mt-1">{summary.categories}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Avg Duration</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{summary.averageDuration} days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 min-w-0">
        <div className="xl:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-4 min-w-0">
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search destination, country, category"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              disabled={routeCategory !== 'All'}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="All">All Categories</option>
              <option value="Family">Family</option>
              <option value="Couple">Couple</option>
              <option value="Adventure">Adventure</option>
              <option value="Culture">Culture</option>
            </select>
          </div>

          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredTours.map((tour) => {
              const key = getTourKey(tour);
              const isActive = selectedTour && getTourKey(selectedTour) === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedTourKey(key)}
                  className={`w-full text-left rounded-lg border p-3 transition-colors ${
                    isActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-800">{tour.destination}</p>
                      <p className="text-xs text-gray-500">{tour.country}</p>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                      {tour.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{tour.duration} days itinerary</p>
                </button>
              );
            })}
            {filteredTours.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">
                No tours found for your filter.
              </p>
            ) : null}
          </div>
        </div>

        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5 min-w-0">
          {selectedTour ? (
            <div className="space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {selectedTour.destination}, {selectedTour.country}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedTour.description}</p>
                </div>
                <Link
                  to={`/tours/${getTourSlug(selectedTour)}`}
                  className="px-3 py-2 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Open Public Tour Page
                </Link>
              </div>

              <div className="w-full h-52 rounded-lg overflow-hidden border border-gray-100">
                <img
                  src={selectedTour.img}
                  alt={selectedTour.destination}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedTour.category}</p>
                </div>
                <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedTour.duration} days</p>
                </div>
                <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                  <p className="text-xs text-gray-500">Planned Activities</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedTour.plan.length}</p>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800 mb-3">Itinerary Plan</h3>
                <div className="space-y-2">
                  {selectedTour.plan.map((dayPlan, index) => (
                    <div
                      key={`${getTourKey(selectedTour)}-${index + 1}`}
                      className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-700"
                    >
                      {dayPlan}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Select a tour to view itinerary details.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminTripsItinerariesPanel;
