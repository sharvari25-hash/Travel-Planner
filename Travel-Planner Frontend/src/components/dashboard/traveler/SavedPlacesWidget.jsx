import React from 'react';
import StatCard from './StatCard';
import { FaMapMarkerAlt, FaSuitcase, FaHotel, FaCamera } from 'react-icons/fa';

const savedPlacesImages = [
  "https://images.unsplash.com/photo-1565881606991-78fa642ddd54?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=200&q=80", 
  "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=200&q=80"
];

const SavedPlacesWidget = () => (
  <>
    <StatCard>
        <div className="flex items-center gap-2 text-orange-600 font-bold mb-3">
          <FaMapMarkerAlt /> Saved Places
       </div>
       <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-800">8</span>
          <div className="flex gap-2 ml-3 text-gray-400 text-lg">
            <FaSuitcase /> <FaHotel /> <FaCamera />
          </div>
       </div>
       <div className="text-xs text-gray-400 mt-2">Eiffel Tower | Mount Fuji</div>
    </StatCard>
    <StatCard className="p-2">
       <div className="flex items-center gap-2 text-blue-600 font-bold px-2 py-1 text-sm">
          <FaMapMarkerAlt /> Saved Places
       </div>
       <div className="flex gap-2 h-full mt-1 overflow-hidden rounded-lg">
         {savedPlacesImages.map((img, i) => (
           <div key={i} className="flex-1 h-20 bg-gray-200 rounded-md overflow-hidden relative">
              <img src={img} alt="Saved" className="w-full h-full object-cover" />
           </div>
         ))}
       </div>
    </StatCard>
  </>
);

export default SavedPlacesWidget;