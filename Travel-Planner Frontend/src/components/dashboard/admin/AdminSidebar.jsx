import React from 'react';
import { FaPlane, FaMoneyBillWave, FaBell, FaCog, FaSuitcase, FaChartBar } from 'react-icons/fa';
import { MdDashboard, MdPeople, MdReceipt } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import SidebarItem from '../shared/SidebarItem';

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#1e3a8a] text-white flex-shrink-0 hidden md:block">
      <div className="p-6 flex items-center gap-2 border-b border-blue-800">
        <FaPlane className="text-2xl text-blue-400" />
        <span className="text-lg font-bold">Travel Planner</span>
      </div>
      
      <nav className="mt-6">
        <SidebarItem icon={MdDashboard} text="Dashboard" to="/admin/dashboard" active={location.pathname === '/admin/dashboard'} />
        <SidebarItem icon={MdPeople} text="User Management" />
        <SidebarItem icon={FaSuitcase} text="Trips & Itineraries" />
        <SidebarItem icon={MdReceipt} text="Bookings" hasSubmenu />
        <SidebarItem icon={FaMoneyBillWave} text="Budget & Payments" />
        <SidebarItem icon={FaChartBar} text="Recommendations" hasSubmenu />
        <SidebarItem icon={FaBell} text="Notifications" hasSubmenu />
        <SidebarItem icon={FaChartBar} text="Reports" hasSubmenu />
        <SidebarItem icon={FaCog} text="Settings" />
      </nav>
    </aside>
  );
};

export default AdminSidebar;