import React, { useEffect, useState } from 'react';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../../lib/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  ADMIN_NOTIFICATIONS_UPDATED_EVENT,
  getAdminNotifications,
} from '../../../lib/adminNotifications';
import {
  CONTACT_MESSAGES_UPDATED_EVENT,
  getAdminContactMessages,
} from '../../../lib/contactMessages';

const AdminHeader = () => {
  const { logout, token, user } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const syncUnread = async () => {
      const localUnread = getAdminNotifications().filter((entry) => !entry.read).length;

      if (!token || user?.role !== 'ADMIN') {
        if (isMounted) {
          setUnreadCount(localUnread);
        }
        return;
      }

      try {
        const contactMessages = await getAdminContactMessages(token);
        const contactUnread = contactMessages.filter((entry) => !entry.read).length;
        if (isMounted) {
          setUnreadCount(localUnread + contactUnread);
        }
      } catch (_error) {
        if (isMounted) {
          setUnreadCount(localUnread);
        }
      }
    };

    syncUnread();
    window.addEventListener(ADMIN_NOTIFICATIONS_UPDATED_EVENT, syncUnread);
    window.addEventListener(CONTACT_MESSAGES_UPDATED_EVENT, syncUnread);

    return () => {
      isMounted = false;
      window.removeEventListener(ADMIN_NOTIFICATIONS_UPDATED_EVENT, syncUnread);
      window.removeEventListener(CONTACT_MESSAGES_UPDATED_EVENT, syncUnread);
    };
  }, [token, user?.role]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-2 text-gray-700">
         <h2 className="font-bold text-xl">Wanderwise Admin</h2>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/admin/dashboard/notifications/unread" className="relative cursor-pointer">
          <FaBell className="text-gray-500 text-xl hover:text-blue-600 transition-colors" />
          {unreadCount > 0 ? (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] min-w-4 h-4 px-1 flex items-center justify-center rounded-full">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          ) : null}
        </Link>
        <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-700 font-medium">API Status: All Systems Operational</span>
        </div>
        <div className="flex items-center gap-3 pl-6 border-l">
          <img src="https://i.pravatar.cc/150?img=68" alt="Admin" className="w-8 h-8 rounded-full border border-gray-200" />
          <div className="text-sm hidden lg:block">
            <span className="font-semibold block text-gray-700">Admin</span>
            <span className="text-gray-400 text-xs">Dashboard</span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            <FaSignOutAlt size={12} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
