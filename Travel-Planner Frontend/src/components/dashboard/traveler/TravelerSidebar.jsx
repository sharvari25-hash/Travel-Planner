import React from 'react';
import { FaPlane, FaSuitcase, FaBell, FaCog, FaPlus } from 'react-icons/fa';
import { MdDashboard, MdExplore } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import SidebarItem from '../shared/SidebarItem';

const TravelerSidebar = () => {
  const location = useLocation();
  const currentSearchParams = new URLSearchParams(location.search);

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
    {
      icon: MdExplore,
      text: 'Explore',
      to: '/tours',
      submenu: [
        { text: 'All Tours', to: '/tours', exact: true, query: { category: null } },
        { text: 'Family', to: '/tours?category=Family', exact: true, query: { category: 'Family' } },
        { text: 'Couple', to: '/tours?category=Couple', exact: true, query: { category: 'Couple' } },
        { text: 'Adventure', to: '/tours?category=Adventure', exact: true, query: { category: 'Adventure' } },
        { text: 'Culture', to: '/tours?category=Culture', exact: true, query: { category: 'Culture' } },
      ],
    },
    {
      icon: FaBell,
      text: 'Notifications',
      to: '/user/dashboard/notifications',
      submenu: [
        { text: 'All', to: '/user/dashboard/notifications', exact: true },
        { text: 'Unread', to: '/user/dashboard/notifications/unread' },
        { text: 'Bookings', to: '/user/dashboard/notifications/bookings' },
        { text: 'Payments', to: '/user/dashboard/notifications/payments' },
      ],
    },
    { icon: FaCog, text: 'Settings', to: '/user/settings', exact: true },
  ];

  const isActive = ({ to, exact, query }) => {
    if (!to) {
      return false;
    }

    const targetPath = normalizePath(to.split('?')[0]);
    const pathMatches = exact ? currentPath === targetPath : currentPath.startsWith(targetPath);

    if (!pathMatches) {
      return false;
    }

    if (!query) {
      return true;
    }

    return Object.entries(query).every(([key, expectedValue]) => {
      const value = currentSearchParams.get(key);
      if (expectedValue === null) {
        return value === null;
      }
      return value === expectedValue;
    });
  };

  return (
    <aside className="w-64 bg-primary text-white flex-shrink-0 flex flex-col hidden md:flex">
      <div className="p-8 flex items-center gap-3">
        <div className="bg-white/10 p-2 rounded-lg">
          <FaPlane className="text-xl text-accent" />
        </div>
        <span className="text-xl font-bold tracking-wide">WanderWise</span>
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
                            ? 'bg-accent text-white font-medium'
                            : 'text-white/75 hover:bg-white/10 hover:text-white'
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
        <button className="w-full bg-accent hover:bg-accent/90 transition-colors text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-black/20">
          <FaPlus size={12} /> New Trip
        </button>
      </div>
    </aside>
  );
};

export default TravelerSidebar;
