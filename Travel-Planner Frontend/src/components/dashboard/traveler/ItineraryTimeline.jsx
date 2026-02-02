import React from 'react';
import { MapPin, Coffee, Camera, ShoppingCart } from 'lucide-react';

const itinerary = [
  { time: '09:00 AM', title: 'Visit the Louvre Museum', icon: <Camera />, color: 'blue' },
  { time: '11:00 AM', title: 'Coffee at Le Procope', icon: <Coffee />, color: 'orange' },
  { time: '01:00 PM', title: 'Walk along the Seine', icon: <MapPin />, color: 'green' },
  { time: '03:00 PM', title: 'Shopping on Champs-Élysées', icon: <ShoppingCart />, color: 'purple' },
];

const ItineraryTimeline = () => {
  return (
    <div className="space-y-8">
      {itinerary.map((item, index) => (
        <div key={index} className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <div className={`w-10 h-10 rounded-full bg-${item.color}-100 flex items-center justify-center text-${item.color}-500`}>
              {item.icon}
            </div>
            {index < itinerary.length - 1 && (
              <div className="w-px h-12 bg-gray-200 mt-2"></div>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">{item.time}</p>
            <h4 className="font-semibold text-gray-800">{item.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;
