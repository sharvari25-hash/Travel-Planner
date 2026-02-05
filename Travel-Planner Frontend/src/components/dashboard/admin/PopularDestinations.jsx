import React from 'react';
import SectionTitle from '../shared/SectionTitle';

const destinations = [
  { city: 'Paris', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80' },
  { city: 'Bali', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80' },
  { city: 'New York', img: 'https://images.unsplash.com/photo-1496442226666-8d4a0ee6d4df?auto=format&fit=crop&w=400&q=80' },
];

const PopularDestinations = () => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <SectionTitle title="Popular Destinations" actions={
           <div className="flex gap-2 text-gray-400">
              <span className="cursor-pointer hover:text-blue-600">{'<'}</span>
              <span className="cursor-pointer hover:text-blue-600">{'>'}</span>
           </div>
      } />
      <div className="space-y-4">
          {destinations.map((dest, i) => (
              <div key={i} className="relative group overflow-hidden rounded-lg cursor-pointer">
                  <img src={dest.img} alt={dest.city} className="w-full h-24 object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <span className="text-white font-bold">{i + 1}. {dest.city}</span>
                  </div>
              </div>
          ))}
      </div>
  </div>
);

export default PopularDestinations;