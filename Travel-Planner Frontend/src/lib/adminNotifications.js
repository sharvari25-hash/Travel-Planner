const STORAGE_KEY = 'adminNotifications';
export const ADMIN_NOTIFICATIONS_UPDATED_EVENT = 'admin-notifications-updated';

const seedNotifications = [
  {
    id: 'adm-ntf-1001',
    type: 'BOOKING',
    title: 'New Booking Request',
    message: 'A new booking request BK-10021 requires approval.',
    createdAt: '2026-02-10T09:35:00.000Z',
    read: false,
    severity: 'HIGH',
  },
  {
    id: 'adm-ntf-1002',
    type: 'PAYMENT',
    title: 'Large Payment Received',
    message: 'Payment PMT-50066 of INR 5,34,000 was received successfully.',
    createdAt: '2026-02-09T16:50:00.000Z',
    read: false,
    severity: 'MEDIUM',
  },
  {
    id: 'adm-ntf-1003',
    type: 'USER',
    title: 'User Account Suspended',
    message: 'User sophia.patel@wanderwise.com was moved to SUSPENDED status.',
    createdAt: '2026-02-09T11:10:00.000Z',
    read: true,
    severity: 'MEDIUM',
  },
  {
    id: 'adm-ntf-1004',
    type: 'SECURITY',
    title: 'Admin Login From New Device',
    message: 'Admin login detected from a new device in Mumbai.',
    createdAt: '2026-02-08T20:05:00.000Z',
    read: false,
    severity: 'HIGH',
  },
  {
    id: 'adm-ntf-1005',
    type: 'SYSTEM',
    title: 'Data Sync Completed',
    message: 'Nightly sync completed with no blocking errors.',
    createdAt: '2026-02-08T04:30:00.000Z',
    read: true,
    severity: 'LOW',
  },
  {
    id: 'adm-ntf-1006',
    type: 'PAYMENT',
    title: 'Payment Failed',
    message: 'Payment PMT-50072 failed and may need traveler follow-up.',
    createdAt: '2026-02-07T18:10:00.000Z',
    read: true,
    severity: 'HIGH',
  },
];

const canUseStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const parseStoredList = (rawValue) => {
  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : null;
  } catch (_error) {
    return null;
  }
};

const sortByDateDesc = (list) =>
  [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const emitUpdated = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new Event(ADMIN_NOTIFICATIONS_UPDATED_EVENT));
};

const writeNotifications = (list) => {
  const normalized = sortByDateDesc(list);
  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    emitUpdated();
  }
  return normalized;
};

export const getAdminNotifications = () => {
  if (!canUseStorage()) {
    return sortByDateDesc(seedNotifications);
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);
  if (!storedValue) {
    return writeNotifications(seedNotifications);
  }

  const parsed = parseStoredList(storedValue);
  if (!parsed) {
    return writeNotifications(seedNotifications);
  }

  return sortByDateDesc(parsed);
};

export const markAdminNotificationRead = (notificationId) => {
  const updated = getAdminNotifications().map((entry) =>
    entry.id === notificationId ? { ...entry, read: true } : entry
  );
  return writeNotifications(updated);
};

export const markAllAdminNotificationsRead = () => {
  const updated = getAdminNotifications().map((entry) => ({ ...entry, read: true }));
  return writeNotifications(updated);
};

export const deleteAdminNotification = (notificationId) => {
  const updated = getAdminNotifications().filter((entry) => entry.id !== notificationId);
  return writeNotifications(updated);
};
