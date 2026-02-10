const STORAGE_KEY = 'travelerNotifications';
export const TRAVELER_NOTIFICATIONS_UPDATED_EVENT = 'traveler-notifications-updated';

const seedNotifications = [
  {
    id: 'ntf-1001',
    type: 'BOOKING',
    title: 'Booking Request Submitted',
    message: 'Your Tokyo tour request was sent to admin for approval.',
    createdAt: '2026-02-10T09:10:00.000Z',
    read: false,
  },
  {
    id: 'ntf-1002',
    type: 'PAYMENT',
    title: 'Payment Successful',
    message: 'Payment for Kyoto booking was successful.',
    createdAt: '2026-02-09T17:20:00.000Z',
    read: false,
  },
  {
    id: 'ntf-1003',
    type: 'TRIP',
    title: 'Upcoming Trip Reminder',
    message: 'Your Bali trip starts in 3 days. Check your itinerary.',
    createdAt: '2026-02-08T11:00:00.000Z',
    read: true,
  },
  {
    id: 'ntf-1004',
    type: 'BOOKING',
    title: 'Booking Approved',
    message: 'Your Santorini booking has been approved by admin.',
    createdAt: '2026-02-07T15:40:00.000Z',
    read: true,
  },
  {
    id: 'ntf-1005',
    type: 'SYSTEM',
    title: 'Profile Updated',
    message: 'Your profile details were saved successfully.',
    createdAt: '2026-02-06T08:30:00.000Z',
    read: true,
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

  window.dispatchEvent(new Event(TRAVELER_NOTIFICATIONS_UPDATED_EVENT));
};

const writeNotifications = (list) => {
  const normalized = sortByDateDesc(list);
  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    emitUpdated();
  }
  return normalized;
};

export const getTravelerNotifications = () => {
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

export const markTravelerNotificationRead = (notificationId) => {
  const updated = getTravelerNotifications().map((entry) =>
    entry.id === notificationId ? { ...entry, read: true } : entry
  );
  return writeNotifications(updated);
};

export const markAllTravelerNotificationsRead = () => {
  const updated = getTravelerNotifications().map((entry) => ({ ...entry, read: true }));
  return writeNotifications(updated);
};

export const deleteTravelerNotification = (notificationId) => {
  const updated = getTravelerNotifications().filter((entry) => entry.id !== notificationId);
  return writeNotifications(updated);
};
