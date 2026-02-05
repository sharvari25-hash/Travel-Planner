import React from 'react';
import { FaSearch } from 'react-icons/fa';

const exploreDestinations = [
  { name: 'Bali', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&q=80' },
  { name: 'Paris', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80' },
  { name: 'New York', img: 'https://images.unsplash.com/photo-1496442226666-8d4a0ee6d4df?auto=format&fit=crop&w=300&q=80' },
];

const ExploreDestinationsWidget = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
     <div className="flex justify-between items-center mb-4">
       <h3 className="font-bold text-gray-800">Explore Destinations</h3>
       <span className="text-xs text-blue-500 cursor-pointer font-medium">View All</span>
     </div>
     
     <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
        <input 
          type="text" 
          placeholder="Where do you want to go?" 
          className="w-full bg-gray-50 text-xs py-2.5 pl-8 pr-3 rounded-lg border-none focus:ring-1 focus:ring-blue-200"
        />
     </div>

     <div className="grid grid-cols-3 gap-3">
        {exploreDestinations.map((dest, i) => (
          <div key={i} className="relative rounded-lg overflow-hidden h-20 group cursor-pointer">
            <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-2">
               <span className="text-white text-[10px] font-bold tracking-wide">{dest.name}</span>
            </div>
          </div>
        ))}
     </div>
  </div>
);

export default ExploreDestinationsWidget;