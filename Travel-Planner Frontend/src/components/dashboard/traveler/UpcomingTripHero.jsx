import React from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaSuitcase, FaWallet, FaHotel, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import { formatInr } from '../../../lib/pricing';

const upcomingTrip = {
  destination: "Tokyo, Japan",
  daysLeft: 4,
  image: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1000&q=80", // Mt Fuji/Pagoda
  flight: {
    from: "Los Angeles (LAX)",
    to: "Tokyo (HND)",
    departDate: "April 25",
    returnDate: "May 25",
    price: 148000
  }
};

const UpcomingTripHero = () => (
  <motion.div 
     initial={{ opacity: 0, scale: 0.98 }}
     animate={{ opacity: 1, scale: 1 }}
     className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-sm group min-h-[500px]"
  >
    {/* Background Image */}
    <img src={upcomingTrip.image} alt="Tokyo" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    
    {/* Overlay Gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>

    {/* Top Text */}
    <div className="absolute top-8 left-8 text-white">
      <h2 className="text-3xl font-bold">{upcomingTrip.destination}</h2>
      <div className="flex items-center gap-2 mt-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-max">
         <FaCalendarAlt className="text-sm" />
         <span className="text-sm font-medium">4 Days Left</span>
      </div>
    </div>

    {/* Floating Flight Card */}
    <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-orange-100 p-1.5 rounded text-orange-500"><FaPlane /></div>
            <h3 className="font-bold text-lg text-gray-800">{upcomingTrip.destination}</h3>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="text-sm">
              <span className="font-medium">Los Angeles (LAX)</span>
              <div className="text-gray-400 text-xs mt-1">{upcomingTrip.flight.departDate}</div>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-16 h-[1px] bg-gray-300 relative top-2"></div>
               <FaPlane className="text-blue-400 text-sm bg-white px-1 z-10" />
            </div>
            <div className="text-sm text-right">
              <span className="font-medium">Tokyo (HND)</span>
               <div className="text-gray-400 text-xs mt-1">{upcomingTrip.flight.returnDate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Row */}
      <div className="flex flex-wrap gap-3 border-t pt-5">
         <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-lg shadow-blue-200">
           View Itinerary
         </button>
         <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors">
           <FaSuitcase size={12} /> Flight Details
         </button>
         <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors">
           <FaWallet size={12} /> View Budget
         </button>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center mt-6 pt-2">
        <div className="flex gap-6 text-sm font-medium text-gray-500">
           <span className="flex items-center gap-2 cursor-pointer hover:text-gray-800"><FaHotel /> Book Hotel</span>
           <span className="flex items-center gap-2 cursor-pointer hover:text-gray-800"><FaPlus /> Add Activity</span>
        </div>
        <span className="text-xl font-bold text-gray-800">{formatInr(upcomingTrip.flight.price)}</span>
      </div>

    </div>
  </motion.div>
);

export default UpcomingTripHero;
