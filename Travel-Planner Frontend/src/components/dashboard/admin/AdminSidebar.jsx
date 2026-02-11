import React, { useEffect } from 'react';
import { FaMoneyBillWave, FaBell, FaCog, FaSuitcase, FaChartBar, FaEnvelope, FaTimes } from 'react-icons/fa';
import { MdDashboard, MdPeople, MdReceipt } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import SidebarItem from '../shared/SidebarItem';

const AdminSidebar = ({ isMobileOpen = false, onMobileClose = () => {} }) => {
  const location = useLocation();

  const normalizePath = (path) => {
    if (!path || path === '/') {
      return path;
    }

    return path.endsWith('/') ? path.slice(0, -1) : path;
  };

  const currentPath = normalizePath(location.pathname);

  useEffect(() => {
    onMobileClose();
  }, [currentPath, onMobileClose]);

  const navItems = [
    { icon: MdDashboard, text: 'Dashboard', to: '/admin/dashboard', exact: true },
    {
      icon: MdPeople,
      text: 'User Management',
      to: '/admin/dashboard/user-management',
      submenu: [
        { text: 'All Users', to: '/admin/dashboard/user-management', exact: true },
        { text: 'Admins', to: '/admin/dashboard/user-management/admins' },
        { text: 'Suspended', to: '/admin/dashboard/user-management/suspended' },
      ],
    },
    {
      icon: FaSuitcase,
      text: 'Trips & Itineraries',
      to: '/admin/dashboard/trips-itineraries',
      submenu: [
        { text: 'All Tours', to: '/admin/dashboard/trips-itineraries', exact: true },
        { text: 'Family', to: '/admin/dashboard/trips-itineraries/family' },
        { text: 'Couple', to: '/admin/dashboard/trips-itineraries/couple' },
        { text: 'Adventure', to: '/admin/dashboard/trips-itineraries/adventure' },
        { text: 'Culture', to: '/admin/dashboard/trips-itineraries/culture' },
      ],
    },
    {
      icon: MdReceipt,
      text: 'Bookings',
      to: '/admin/dashboard/bookings',
      submenu: [
        { text: 'All Requests', to: '/admin/dashboard/bookings', exact: true },
        { text: 'Pending', to: '/admin/dashboard/bookings/pending' },
        { text: 'Approved', to: '/admin/dashboard/bookings/approved' },
        { text: 'Rejected', to: '/admin/dashboard/bookings/rejected' },
      ],
    },
    {
      icon: FaMoneyBillWave,
      text: 'Payments',
      to: '/admin/dashboard/budget-payments',
      submenu: [
        { text: 'Payment History', to: '/admin/dashboard/budget-payments', exact: true },
        { text: 'Successful', to: '/admin/dashboard/budget-payments/successful' },
        { text: 'Pending', to: '/admin/dashboard/budget-payments/pending' },
        { text: 'Refunded', to: '/admin/dashboard/budget-payments/refunded' },
      ],
    },
    {
      icon: FaChartBar,
      text: 'Recommendations',
      to: '/admin/dashboard/recommendations',
      submenu: [
        { text: 'All Suggestions', to: '/admin/dashboard/recommendations', exact: true },
        { text: 'Destinations', to: '/admin/dashboard/recommendations/destinations' },
        { text: 'Pricing', to: '/admin/dashboard/recommendations/pricing' },
        { text: 'Travel Timing', to: '/admin/dashboard/recommendations/timing' },
      ],
    },
    {
      icon: FaBell,
      text: 'Notifications',
      to: '/admin/dashboard/notifications',
      submenu: [
        { text: 'All Alerts', to: '/admin/dashboard/notifications', exact: true },
        { text: 'Unread', to: '/admin/dashboard/notifications/unread' },
        { text: 'Bookings', to: '/admin/dashboard/notifications/bookings' },
        { text: 'Payments', to: '/admin/dashboard/notifications/payments' },
        { text: 'Users', to: '/admin/dashboard/notifications/users' },
        { text: 'Security', to: '/admin/dashboard/notifications/security' },
        { text: 'System', to: '/admin/dashboard/notifications/system' },
      ],
    },
    {
      icon: FaEnvelope,
      text: 'Messages',
      to: '/admin/dashboard/messages',
      submenu: [
        { text: 'All Messages', to: '/admin/dashboard/messages', exact: true },
        { text: 'Unread', to: '/admin/dashboard/messages/unread' },
      ],
    },
    {
      icon: FaChartBar,
      text: 'Reports',
      to: '/admin/dashboard/reports',
      submenu: [
        { text: 'Overview', to: '/admin/dashboard/reports', exact: true },
        { text: 'Revenue', to: '/admin/dashboard/reports/revenue' },
        { text: 'Bookings', to: '/admin/dashboard/reports/bookings' },
        { text: 'Users', to: '/admin/dashboard/reports/users' },
      ],
    },
    { icon: FaCog, text: 'Settings', to: '/admin/dashboard/settings' },
  ];

  const isActive = ({ to, exact }) => {
    const targetPath = normalizePath(to);
    return exact ? currentPath === targetPath : currentPath.startsWith(targetPath);
  };

  const renderNavigation = (onItemSelect) => (
    <nav className="mt-6 flex-1 overflow-y-auto pb-6">
      {navItems.map((item) => {
        const itemActive = isActive(item);

        return (
          <div key={item.text}>
            <SidebarItem
              icon={item.icon}
              text={item.text}
              to={item.to}
              hasSubmenu={item.hasSubmenu || Boolean(item.submenu?.length)}
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
        <div className="p-6 flex items-center gap-2 border-b border-white/15">
          <img
            src="/wanderwise-mark.svg"
            alt="WanderWise Logo"
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-lg font-bold">WanderWise</span>
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
          aria-label="Admin navigation menu"
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

export default AdminSidebar;
