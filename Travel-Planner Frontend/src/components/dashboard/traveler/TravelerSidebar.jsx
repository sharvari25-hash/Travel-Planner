import React from 'react';
import { FaPlane, FaSuitcase, FaBell, FaCog, FaPlus } from 'react-icons/fa';
import { MdDashboard, MdExplore } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import SidebarItem from '../shared/SidebarItem';

const TravelerSidebar = () => {
  const location = useLocation();

  const normalizePath = (path) => {
    if (!path || path === '/') {
      return path;
    }

    return path.endsWith('/') ? path.slice(0, -1) : path;
  };

  const currentPath = normalizePath(location.pathname);

  const navItems = [
    { icon: MdDashboard, text: 'Dashboard', to: '/user/dashboard', exact: true },
    {
      icon: FaSuitcase,
      text: 'My Trips',
      to: '/user/dashboard/my-trips',
      submenu: [
        { text: 'All Trips', to: '/user/dashboard/my-trips', exact: true },
        { text: 'Upcoming', to: '/user/dashboard/my-trips/upcoming' },
        { text: 'Completed', to: '/user/dashboard/my-trips/completed' },
      ],
    },
    { icon: MdExplore, text: 'Explore', to: '/tours', exact: true },
    { icon: FaBell, text: 'Notifications' },
    { icon: FaCog, text: 'Settings', to: '/user/settings', exact: true },
  ];

  const isActive = ({ to, exact }) => {
    if (!to) {
      return false;
    }

    const targetPath = normalizePath(to);
    return exact ? currentPath === targetPath : currentPath.startsWith(targetPath);
  };

  return (
    <aside className="w-64 bg-[#1E3A8A] text-white flex-shrink-0 flex flex-col hidden md:flex">
      <div className="p-8 flex items-center gap-3">
        <div className="bg-white/10 p-2 rounded-lg">
          <FaPlane className="text-xl text-white" />
        </div>
        <span className="text-xl font-bold tracking-wide">Travel Planner</span>
      </div>
      
      <nav className="flex-1 mt-2 space-y-1">
        {navItems.map((item) => {
          const itemActive = isActive(item);

          return (
            <div key={item.text}>
              <SidebarItem
                icon={item.icon}
                text={item.text}
                to={item.to}
                hasSubmenu={Boolean(item.submenu?.length)}
                active={itemActive}
              />
              {item.submenu?.length ? (
                <div className={`pl-10 pr-4 pb-2 space-y-1 ${itemActive ? 'block' : 'hidden'}`}>
                  {item.submenu.map((subItem) => {
                    const subActive = isActive(subItem);
                    return (
                      <Link
                        key={subItem.text}
                        to={subItem.to}
                        className={`block text-xs rounded px-3 py-2 transition-colors ${
                          subActive
                            ? 'bg-blue-700 text-white font-medium'
                            : 'text-blue-100 hover:bg-blue-800/60 hover:text-white'
                        }`}
                      >
                        {subItem.text}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
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
