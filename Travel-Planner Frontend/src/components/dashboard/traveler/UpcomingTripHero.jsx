import React from 'react';
import { Sun, Cloud, Wind } from 'lucide-react';

const UpcomingTripHero = () => {
  return (
    <div className="relative bg-white p-8 rounded-lg shadow-md h-full flex flex-col justify-between bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502602898657-3e91760c0341?auto=format&fit=crop&w=1000')" }}>
      <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
      <div className="relative z-10">
        <h3 className="font-semibold">UPCOMING TRIP</h3>
        <h2 className="text-4xl font-bold mt-2">Paris, France</h2>
        <p className="text-lg">Your next adventure starts in...</p>
      </div>
      <div className="relative z-10 flex justify-between items-end">
        <div>
          <p className="text-5xl font-bold">12</p>
          <p>Days</p>
        </div>
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm p-2 rounded-lg">
          <Sun size={32} />
          <div>
            <p className="font-bold text-xl">18°C</p>
            <p className="text-sm">Sunny</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTripHero;
