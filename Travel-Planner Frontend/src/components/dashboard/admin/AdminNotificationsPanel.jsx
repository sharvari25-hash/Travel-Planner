import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaBell,
  FaCheck,
  FaCreditCard,
  FaSuitcase,
  FaTrash,
  FaUserShield,
  FaCog,
} from 'react-icons/fa';
import { useAuth } from '../../../lib/AuthContext';
import {
  deleteAdminNotification,
  getAdminNotifications,
  markAdminNotificationRead,
  markAllAdminNotificationsRead,
} from '../../../lib/adminNotifications';
import {
  deleteAdminContactMessage,
  getAdminContactMessages,
  markAdminContactMessageRead,
  markAllAdminContactMessagesRead,
} from '../../../lib/contactMessages';

const typeStyles = {
  BOOKING: 'bg-blue-100 text-blue-700',
  PAYMENT: 'bg-green-100 text-green-700',
  USER: 'bg-purple-100 text-purple-700',
  SECURITY: 'bg-red-100 text-red-700',
  SYSTEM: 'bg-gray-100 text-gray-700',
};

const typeLabels = {
  BOOKING: 'Booking',
  PAYMENT: 'Payment',
  USER: 'User',
  SECURITY: 'Security',
  SYSTEM: 'System',
};

const severityStyles = {
  HIGH: 'bg-red-100 text-red-700',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  LOW: 'bg-gray-100 text-gray-600',
};

const typeIcons = {
  BOOKING: FaSuitcase,
  PAYMENT: FaCreditCard,
  USER: FaUserShield,
  SECURITY: FaUserShield,
  SYSTEM: FaCog,
};

const getRouteFilter = (tab) => {
  if (tab === 'unread') {
    return 'UNREAD';
  }

  if (tab === 'bookings') {
    return 'BOOKING';
  }

  if (tab === 'payments') {
    return 'PAYMENT';
  }

  if (tab === 'users') {
    return 'USER';
  }

  if (tab === 'system') {
    return 'SYSTEM';
  }

  if (tab === 'security') {
    return 'SECURITY';
  }

  return 'ALL';
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const sortByDateDesc = (list) =>
  [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const mapContactMessageToNotification = (entry) => ({
  id: `contact-${entry.messageId}`,
  type: 'SYSTEM',
  title: `Contact Inquiry: ${entry.subject}`,
  message: `${entry.fullName} (${entry.email}) - ${entry.message}`,
  createdAt: entry.createdAt,
  read: Boolean(entry.read),
  severity: entry.read ? 'LOW' : 'HIGH',
  source: 'CONTACT',
  contactMessageId: entry.messageId,
});

const AdminNotificationsPanel = () => {
  const { user, token } = useAuth();
  const { tab } = useParams();
  const isAdmin = user?.role === 'ADMIN';

  const [localNotifications, setLocalNotifications] = useState(() => getAdminNotifications());
  const [contactMessages, setContactMessages] = useState([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [actionError, setActionError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  React.useEffect(() => {
    let isMounted = true;

    const loadContactMessages = async () => {
      if (!isAdmin || !token) {
        if (isMounted) {
          setContactMessages([]);
        }
        return;
      }

      setIsLoadingContacts(true);
      setFetchError('');

      try {
        const payload = await getAdminContactMessages(token);
        if (isMounted) {
          setContactMessages(payload);
        }
      } catch (error) {
        if (isMounted) {
          setFetchError(error?.message || 'Unable to load contact inquiries.');
          setContactMessages([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingContacts(false);
        }
      }
    };

    loadContactMessages();

    return () => {
      isMounted = false;
    };
  }, [isAdmin, token]);

  const notifications = useMemo(() => {
    const mappedContacts = contactMessages.map(mapContactMessageToNotification);
    return sortByDateDesc([...mappedContacts, ...localNotifications]);
  }, [contactMessages, localNotifications]);

  const routeFilter = getRouteFilter(tab);
  const activeTypeFilter = routeFilter === 'ALL' ? typeFilter : routeFilter;

  const summary = useMemo(
    () => ({
      total: notifications.length,
      unread: notifications.filter((entry) => !entry.read).length,
      bookings: notifications.filter((entry) => entry.type === 'BOOKING').length,
      critical: notifications.filter((entry) => entry.severity === 'HIGH').length,
    }),
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return notifications.filter((entry) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        entry.title.toLowerCase().includes(normalizedSearch) ||
        entry.message.toLowerCase().includes(normalizedSearch) ||
        entry.type.toLowerCase().includes(normalizedSearch);

      if (activeTypeFilter === 'UNREAD') {
        return matchesSearch && !entry.read;
      }

      if (activeTypeFilter === 'ALL') {
        return matchesSearch;
      }

      return matchesSearch && entry.type === activeTypeFilter;
    });
  }, [notifications, searchTerm, activeTypeFilter]);

  const handleMarkRead = async (entry) => {
    setActionError('');

    if (entry.source === 'CONTACT') {
      if (!token) {
        setActionError('Your session has expired. Please login again.');
        return;
      }

      try {
        const updated = await markAdminContactMessageRead(token, entry.contactMessageId);
        setContactMessages((current) =>
          current.map((item) =>
            item.messageId === entry.contactMessageId ? updated : item
          )
        );
      } catch (error) {
        setActionError(error?.message || 'Unable to mark contact inquiry as read.');
      }
      return;
    }

    setLocalNotifications(markAdminNotificationRead(entry.id));
  };

  const handleMarkAllRead = async () => {
    setActionError('');
    setLocalNotifications(markAllAdminNotificationsRead());

    if (!token) {
      return;
    }

    try {
      const updated = await markAllAdminContactMessagesRead(token);
      setContactMessages(updated);
    } catch (error) {
      setActionError(error?.message || 'Unable to mark all contact inquiries as read.');
    }
  };

  const handleDelete = async (entry) => {
    setActionError('');

    if (entry.source === 'CONTACT') {
      if (!token) {
        setActionError('Your session has expired. Please login again.');
        return;
      }

      try {
        await deleteAdminContactMessage(token, entry.contactMessageId);
        setContactMessages((current) =>
          current.filter((item) => item.messageId !== entry.contactMessageId)
        );
      } catch (error) {
        setActionError(error?.message || 'Unable to delete contact inquiry.');
      }
      return;
    }

    setLocalNotifications(deleteAdminNotification(entry.id));
  };

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
        <p className="text-sm text-gray-500 mt-2">
          Only users with the ADMIN role can view notification feeds.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track booking, payment, user, and system alerts in real time.
          </p>
        </div>
        <button
          type="button"
          onClick={handleMarkAllRead}
          className="px-3 py-2 rounded-lg text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Mark All as Read
        </button>
      </div>

      {fetchError ? (
        <div className="bg-white rounded-xl border border-red-200 shadow-sm p-4 text-sm text-red-700">
          {fetchError}
        </div>
      ) : null}

      {actionError ? (
        <div className="bg-white rounded-xl border border-red-200 shadow-sm p-4 text-sm text-red-700">
          {actionError}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Total</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{summary.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Unread</p>
          <p className="text-2xl font-bold text-blue-700 mt-1">{summary.unread}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Booking Alerts</p>
          <p className="text-2xl font-bold text-indigo-700 mt-1">{summary.bookings}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-400">Critical</p>
          <p className="text-2xl font-bold text-red-700 mt-1">{summary.critical}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search notifications"
            className="w-full md:flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            disabled={routeFilter !== 'ALL'}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="ALL">All Types</option>
            <option value="UNREAD">Unread</option>
            <option value="BOOKING">Bookings</option>
            <option value="PAYMENT">Payments</option>
            <option value="USER">Users</option>
            <option value="SECURITY">Security</option>
            <option value="SYSTEM">System</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {isLoadingContacts ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-sm text-gray-500">
            Loading contact inquiries...
          </div>
        ) : null}

        {filteredNotifications.map((entry) => {
          const Icon = typeIcons[entry.type] || FaBell;

          return (
            <article
              key={entry.id}
              className={`bg-white rounded-xl border shadow-sm p-4 ${
                entry.read ? 'border-gray-100' : 'border-blue-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        typeStyles[entry.type] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {typeLabels[entry.type] || entry.type}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        severityStyles[entry.severity] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {entry.severity || 'LOW'}
                    </span>
                    {!entry.read ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        Unread
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{entry.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{formatDate(entry.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!entry.read ? (
                    <button
                      type="button"
                      onClick={() => handleMarkRead(entry)}
                      className="px-2 py-1 rounded-md text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 inline-flex items-center gap-1"
                    >
                      <FaCheck size={10} />
                      Mark Read
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => handleDelete(entry)}
                    className="px-2 py-1 rounded-md text-xs bg-red-100 hover:bg-red-200 text-red-700 inline-flex items-center gap-1"
                  >
                    <FaTrash size={10} />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center text-sm text-gray-500">
          No notifications found for this view.
        </div>
      ) : null}
    </section>
  );
};

export default AdminNotificationsPanel;
