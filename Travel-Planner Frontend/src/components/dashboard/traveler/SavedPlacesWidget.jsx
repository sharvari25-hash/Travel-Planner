import React from 'react';
import StatCard from './StatCard';
import { FaMapMarkerAlt, FaSuitcase, FaHotel, FaCamera } from 'react-icons/fa';

const FALLBACK_IMAGE_URL =
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=60';

const SavedPlacesWidget = ({ savedPlaces }) => {
  const topPlaces = Array.isArray(savedPlaces?.topPlaces) ? savedPlaces.topPlaces : [];
  const placeLabel = topPlaces.slice(0, 2)
    .map((entry) => entry.destination)
    .filter(Boolean)
    .join(' | ');

  return (
    <>
      <StatCard>
        <div className="flex items-center gap-2 text-orange-600 font-bold mb-3">
          <FaMapMarkerAlt /> Saved Places
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-gray-800">{Number(savedPlaces?.total || 0)}</span>
          <div className="flex gap-2 ml-3 text-gray-400 text-lg">
            <FaSuitcase /> <FaHotel /> <FaCamera />
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2">
          {placeLabel || 'No destinations saved yet'}
        </div>
      </StatCard>
      <StatCard className="p-2">
        <div className="flex items-center gap-2 text-blue-600 font-bold px-2 py-1 text-sm">
          <FaMapMarkerAlt /> Saved Places
        </div>
        <div className="flex gap-2 h-full mt-1 overflow-hidden rounded-lg">
          {topPlaces.length === 0 ? (
            <div className="w-full h-20 rounded-md bg-gray-50 text-gray-400 text-xs flex items-center justify-center">
              No saved places
            </div>
          ) : (
            topPlaces.map((entry, index) => (
              <div key={`${entry.destination}-${index}`} className="flex-1 h-20 bg-gray-200 rounded-md overflow-hidden relative">
                <img src={entry.imageUrl || FALLBACK_IMAGE_URL} alt={entry.destination} className="w-full h-full object-cover" />
              </div>
            ))
          )}
        </div>
      </StatCard>
    </>
  );
};

export default SavedPlacesWidget;
