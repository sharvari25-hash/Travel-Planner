import React from 'react';
import { FaBell, FaCog } from 'react-icons/fa';
import { MdDashboard, MdExplore } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import SidebarItem from '../dashboard/shared/SidebarItem';

const SettingsSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-primary text-white flex-shrink-0 flex flex-col hidden md:flex relative">
      <div className="p-8 flex items-center gap-3">
         <div className="bg-white/10 p-2 rounded-lg">
           {/* Logo Icon */}
           <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
         </div>
         <span className="text-xl font-bold tracking-wide">WanderWise</span>
       </div>
      
      <nav className="flex-1 mt-4 space-y-1">
        <SidebarItem icon={MdDashboard} text="Dashboard" to="/user/dashboard" active={location.pathname === '/user/dashboard'} />
        <SidebarItem icon={MdExplore} text="My Trips" to="/user/dashboard/my-trips" active={location.pathname.startsWith('/user/dashboard/my-trips')} />
        <SidebarItem icon={MdExplore} text="Explore" to="/tours" active={location.pathname === '/tours'} />
        <SidebarItem icon={FaBell} text="Notifications" to="/user/dashboard/notifications" active={location.pathname.startsWith('/user/dashboard/notifications')} />
        <SidebarItem icon={FaCog} text="Settings" to="/user/settings" active={location.pathname === '/user/settings'} />
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
