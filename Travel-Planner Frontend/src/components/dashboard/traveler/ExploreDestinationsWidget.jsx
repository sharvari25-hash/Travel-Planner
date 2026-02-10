import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const ExploreDestinationsWidget = ({ destinations = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDestinations = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) {
      return destinations;
    }

    return destinations.filter((entry) => {
      const destination = String(entry.destination || '').toLowerCase();
      const country = String(entry.country || '').toLowerCase();
      return destination.includes(normalizedSearch) || country.includes(normalizedSearch);
    });
  }, [destinations, searchTerm]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Explore Destinations</h3>
        <Link to="/tours" className="text-xs text-blue-500 cursor-pointer font-medium">View All</Link>
      </div>

      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Where do you want to go?"
          className="w-full bg-gray-50 text-xs py-2.5 pl-8 pr-3 rounded-lg border-none focus:ring-1 focus:ring-blue-200"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {filteredDestinations.length === 0 ? (
          <div className="col-span-3 h-20 rounded-lg bg-gray-50 text-gray-400 text-xs flex items-center justify-center">
            No destinations found
          </div>
        ) : (
          filteredDestinations.slice(0, 3).map((dest) => (
            <Link key={dest.slug} to={`/tours/${dest.slug}`} className="relative rounded-lg overflow-hidden h-20 group cursor-pointer">
              <img src={dest.imageUrl} alt={dest.destination} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/35 flex items-end justify-center pb-2">
                <span className="text-white text-[10px] font-bold tracking-wide">{dest.destination}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ExploreDestinationsWidget;
