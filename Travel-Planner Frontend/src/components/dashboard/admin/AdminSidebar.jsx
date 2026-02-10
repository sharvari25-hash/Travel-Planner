import React from 'react';
import { FaPlane, FaMoneyBillWave, FaBell, FaCog, FaSuitcase, FaChartBar } from 'react-icons/fa';
import { MdDashboard, MdPeople, MdReceipt } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import SidebarItem from '../shared/SidebarItem';

const AdminSidebar = () => {
  const location = useLocation();

  const normalizePath = (path) => {
    if (!path || path === '/') {
      return path;
    }

    return path.endsWith('/') ? path.slice(0, -1) : path;
  };

  const currentPath = normalizePath(location.pathname);
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
    { icon: FaSuitcase, text: 'Trips & Itineraries', to: '/admin/dashboard/trips-itineraries' },
    { icon: MdReceipt, text: 'Bookings', to: '/admin/dashboard/bookings', hasSubmenu: true },
    { icon: FaMoneyBillWave, text: 'Budget & Payments', to: '/admin/dashboard/budget-payments' },
    { icon: FaChartBar, text: 'Recommendations', to: '/admin/dashboard/recommendations', hasSubmenu: true },
    { icon: FaBell, text: 'Notifications', to: '/admin/dashboard/notifications', hasSubmenu: true },
    { icon: FaChartBar, text: 'Reports', to: '/admin/dashboard/reports', hasSubmenu: true },
    { icon: FaCog, text: 'Settings', to: '/admin/dashboard/settings' },
  ];

  const isActive = ({ to, exact }) => {
    const targetPath = normalizePath(to);
    return exact ? currentPath === targetPath : currentPath.startsWith(targetPath);
  };

  return (
    <aside className="w-64 bg-[#1e3a8a] text-white flex-shrink-0 hidden md:block">
      <div className="p-6 flex items-center gap-2 border-b border-blue-800">
        <FaPlane className="text-2xl text-blue-400" />
        <span className="text-lg font-bold">Wanderwise</span>
      </div>
      
      <nav className="mt-6">
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
    </aside>
  );
};

export default AdminSidebar;
