import React from 'react';

const trips = [
  {
    destination: 'Tokyo, Japan',
    dateRange: 'Oct 10 - Oct 24, 2026',
    collaborators: [
      'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      'https://i.pravatar.cc/150?u=a042581f4e29026704e',
      'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    ],
    img: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=400'
  },
  {
    destination: 'Rome, Italy',
    dateRange: 'Dec 01 - Dec 08, 2026',
    collaborators: [
      'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    ],
    img: 'https://images.unsplash.com/photo-1529260830199-42c24129f196?auto=format&fit=crop&w=400'
  },
  {
    destination: 'Sydney, Australia',
    dateRange: 'Jan 15 - Jan 29, 2027',
    collaborators: [
      'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      'https://i.pravatar.cc/150?u=a042581f4e29026704g',
    ],
    img: 'https://images.unsplash.com/photo-1524293581277-70a72a997d2c?auto=format&fit=crop&w=400'
  },
];

const TripCard = ({ trip }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden group">
    <div className="relative">
      <img src={trip.img} alt={trip.destination} className="w-full h-40 object-cover" />
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute top-4 left-4">
        <h4 className="text-white text-lg font-bold">{trip.destination}</h4>
        <p className="text-white text-sm">{trip.dateRange}</p>
      </div>
    </div>
    <div className="p-4 flex justify-between items-center">
      <div>
        <p className="text-xs text-gray-500 mb-1">Collaborators</p>
        <div className="flex -space-x-2">
          {trip.collaborators.map((src, i) => (
            <img key={i} src={src} alt="Collaborator" className="w-8 h-8 rounded-full border-2 border-white" />
          ))}
        </div>
      </div>
      <button className="text-primary hover:underline text-sm font-semibold">View Details</button>
    </div>
  </div>
);

const TripCardGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map((trip, i) => (
        <TripCard key={i} trip={trip} />
      ))}
    </div>
  );
};

export default TripCardGrid;
