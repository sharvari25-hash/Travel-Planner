import React, { useEffect } from 'react';
import { FaSuitcase, FaBell, FaCog, FaTimes } from 'react-icons/fa';
import { MdDashboard, MdExplore } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import SidebarItem from '../shared/SidebarItem';

const TravelerSidebar = ({ isMobileOpen = false, onMobileClose = () => {} }) => {
  const location = useLocation();
  const currentSearchParams = new URLSearchParams(location.search);

  const normalizePath = (path) => {
    if (!path || path === '/') {
      return path;
    }

    return path.endsWith('/') ? path.slice(0, -1) : path;
  };

  const currentPath = normalizePath(location.pathname);

  useEffect(() => {
    onMobileClose();
  }, [currentPath, location.search, onMobileClose]);

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

  const renderNavigation = (onItemSelect) => (
    <nav className="flex-1 mt-2 space-y-1 overflow-y-auto pb-4">
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
              onClick={onItemSelect}
            />
            {item.submenu?.length ? (
              <div className={`pl-10 pr-4 pb-2 space-y-1 ${itemActive ? 'block' : 'hidden'}`}>
                {item.submenu.map((subItem) => {
                  const subActive = isActive(subItem);
                  return (
                    <Link
                      key={subItem.text}
                      to={subItem.to}
                      onClick={onItemSelect}
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
  );

  return (
    <>
      <aside className="w-64 bg-primary text-white flex-shrink-0 hidden md:flex md:flex-col md:sticky md:top-0 md:h-screen">
      <div className="p-8 flex items-center gap-3">
        <img
          src="/wanderwise-mark.svg"
          alt="WanderWise Logo"
          className="h-9 w-9 rounded-lg"
        />
        <span className="text-xl font-bold tracking-wide">WanderWise</span>
      </div>
      
      {renderNavigation()}
      </aside>

      <div
        className={`fixed inset-0 z-40 md:hidden ${isMobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isMobileOpen}
      >
        <button
          type="button"
          onClick={onMobileClose}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Close sidebar backdrop"
        />

        <aside
          className={`absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-primary text-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Traveler navigation menu"
        >
          <div className="p-6 flex items-center justify-between border-b border-white/15">
            <div className="flex items-center gap-2">
              <img
                src="/wanderwise-mark.svg"
                alt="WanderWise Logo"
                className="h-8 w-8 rounded-lg"
              />
              <span className="text-lg font-bold">WanderWise</span>
            </div>
            <button
              type="button"
              onClick={onMobileClose}
              className="inline-flex items-center justify-center h-8 w-8 rounded-md text-white/90 hover:bg-white/10"
              aria-label="Close navigation menu"
            >
              <FaTimes size={14} />
            </button>
          </div>
          {renderNavigation(onMobileClose)}
        </aside>
      </div>
    </>
  );
};

export default TravelerSidebar;
