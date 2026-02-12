import React, { useEffect, useState } from 'react';
import { FaSearch, FaBell, FaPhoneAlt, FaInfoCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../lib/AuthContext';
import {
  getTravelerNotifications,
  TRAVELER_NOTIFICATIONS_UPDATED_EVENT,
} from '../../../lib/travelerNotifications';

const SUPPORT_PHONE = import.meta.env.VITE_SUPPORT_PHONE || '+91 98765 43210';
const SUPPORT_TEL_LINK = SUPPORT_PHONE.replace(/[^\d+]/g, '');

const TravelerHeader = ({ onMenuToggle, isMenuOpen = false }) => {
  const { logout, token, user } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const syncNotifications = async () => {
      if (!token) {
        if (isMounted) {
          setUnreadCount(0);
        }
        return;
      }

      try {
        const list = await getTravelerNotifications(token);
        if (isMounted) {
          setUnreadCount(list.filter((entry) => !entry.read).length);
        }
      } catch (_error) {
        if (isMounted) {
          setUnreadCount(0);
        }
      }
    };

    syncNotifications();
    window.addEventListener(TRAVELER_NOTIFICATIONS_UPDATED_EVENT, syncNotifications);

    return () => {
      isMounted = false;
      window.removeEventListener(TRAVELER_NOTIFICATIONS_UPDATED_EVENT, syncNotifications);
    };
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleOpenSettings = () => {
    navigate('/user/settings');
  };

  const profileAvatar = user?.avatar || `https://i.pravatar.cc/150?u=${user?.email || 'traveler'}`;
  const profileAlt = user?.name ? `${user.name} profile` : 'Profile';

  return (
    <header className="bg-white px-4 md:px-8 py-4 md:py-5 flex justify-between items-center border-b border-gray-100 shrink-0">
      <div className="flex items-center gap-4 w-[40rem] max-w-full">
        {onMenuToggle ? (
          <button
            type="button"
            onClick={onMenuToggle}
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
          </button>
        ) : null}
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for flights, hotels, activities..."
            className="w-full bg-gray-50 pl-12 pr-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:border-blue-200"
          />
        </div>
        <Link
          to="/"
          className="px-3 py-2 rounded-lg text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors whitespace-nowrap"
        >
          Home Page
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/user/dashboard/notifications" className="relative cursor-pointer">
          <FaBell className="text-gray-500 text-lg hover:text-blue-600 transition-colors" />
          {unreadCount > 0 ? (
            <span className="absolute -top-1.5 -right-1 bg-red-500 text-white text-[10px] min-w-4 h-4 px-1 flex items-center justify-center rounded-full border-2 border-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          ) : null}
        </Link>
        <div className="flex items-center gap-4 text-gray-400 border-l pl-6">
          <a
            href={`tel:${SUPPORT_TEL_LINK}`}
            aria-label={`Call support ${SUPPORT_PHONE}`}
            title={`Call support: ${SUPPORT_PHONE}`}
            className="hover:text-gray-600 transition-colors"
          >
            <FaPhoneAlt className="cursor-pointer" size={14} />
          </a>
          <Link
            to="/contact-us"
            aria-label="Open support information"
            title="Support information"
            className="hover:text-gray-600 transition-colors"
          >
            <FaInfoCircle className="cursor-pointer" size={16} />
          </Link>
        </div>
        <button type="button" onClick={handleOpenSettings} title="Open settings">
          <img
            src={profileAvatar}
            alt={profileAlt}
            className="w-9 h-9 rounded-full border-2 border-white shadow-sm cursor-pointer"
          />
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          <FaSignOutAlt size={12} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default TravelerHeader;
