import React from 'react';
import { FaSearch, FaBell, FaPhoneAlt, FaInfoCircle } from 'react-icons/fa';

const TravelerHeader = () => (
  <header className="bg-white px-8 py-5 flex justify-between items-center border-b border-gray-100 shrink-0">
    <div className="relative w-96">
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input 
        type="text" 
        placeholder="Search for flights, hotels, activities..." 
        className="w-full bg-gray-50 pl-12 pr-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:border-blue-200"
      />
    </div>
    
    <div className="flex items-center gap-6">
      <div className="relative cursor-pointer">
        <FaBell className="text-gray-500 text-lg hover:text-blue-600 transition-colors" />
        <span className="absolute -top-1.5 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">2</span>
      </div>
      <div className="flex items-center gap-4 text-gray-400 border-l pl-6">
          <FaPhoneAlt className="hover:text-gray-600 cursor-pointer" size={14} />
          <FaInfoCircle className="hover:text-gray-600 cursor-pointer" size={16} />
      </div>
      <img 
        src="https://i.pravatar.cc/150?img=12" 
        alt="Profile" 
        className="w-9 h-9 rounded-full border-2 border-white shadow-sm cursor-pointer" 
      />
    </div>
  </header>
);

export default TravelerHeader;