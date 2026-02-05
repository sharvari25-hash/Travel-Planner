import React from 'react';
import { FaPlane, FaSuitcase, FaBell, FaCog, FaPlus } from 'react-icons/fa';
import { MdDashboard, MdExplore } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import SidebarItem from '../shared/SidebarItem';

const TravelerSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#1E3A8A] text-white flex-shrink-0 flex flex-col hidden md:flex">
      <div className="p-8 flex items-center gap-3">
        <div className="bg-white/10 p-2 rounded-lg">
          <FaPlane className="text-xl text-white" />
        </div>
        <span className="text-xl font-bold tracking-wide">Travel Planner</span>
      </div>
      
      <nav className="flex-1 mt-2 space-y-1">
        <SidebarItem icon={MdDashboard} text="Dashboard" to="/user/dashboard" active={location.pathname === '/user/dashboard'} />
        <SidebarItem icon={FaSuitcase} text="My Trips" to="/user/dashboard/my-trips" hasSubmenu active={location.pathname.startsWith('/user/dashboard/my-trips')} />
        <SidebarItem icon={MdExplore} text="Explore" to="/tours" active={location.pathname === '/tours'} />
        <SidebarItem icon={FaBell} text="Notifications" />
        <SidebarItem icon={FaCog} text="Settings" to="/user/settings" active={location.pathname === '/user/settings'} />
      </nav>

      <div className="p-6">
        <button className="w-full bg-blue-500 hover:bg-blue-600 transition-colors text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
          <FaPlus size={12} /> New Trip
        </button>
      </div>
    </aside>
  );
};

export default TravelerSidebar;