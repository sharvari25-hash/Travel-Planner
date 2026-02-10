const STORAGE_KEY = 'adminPaymentHistory';

const seedPaymentHistory = [
  {
    id: 'PMT-50091',
    bookingId: 'BK-10021',
    travelerName: 'Demo Traveler',
    travelerEmail: 'traveler@demo.com',
    method: 'CARD',
    amount: 1850,
    currency: 'USD',
    status: 'PENDING',
    paidAt: '2026-02-10T09:20:00.000Z',
  },
  {
    id: 'PMT-50087',
    bookingId: 'BK-10019',
    travelerName: 'Liam Carter',
    travelerEmail: 'liam.carter@demo.com',
    method: 'UPI',
    amount: 2320,
    currency: 'USD',
    status: 'SUCCESS',
    paidAt: '2026-02-09T16:42:00.000Z',
  },
  {
    id: 'PMT-50080',
    bookingId: 'BK-10015',
    travelerName: 'Sophia Patel',
    travelerEmail: 'sophia.patel@demo.com',
    method: 'CARD',
    amount: 910,
    currency: 'USD',
    status: 'REFUNDED',
    paidAt: '2026-02-08T12:10:00.000Z',
  },
  {
    id: 'PMT-50072',
    bookingId: 'BK-10011',
    travelerName: 'Noah Kim',
    travelerEmail: 'noah.kim@demo.com',
    method: 'BANK_TRANSFER',
    amount: 1430,
    currency: 'USD',
    status: 'FAILED',
    paidAt: '2026-02-07T18:05:00.000Z',
  },
  {
    id: 'PMT-50066',
    bookingId: 'BK-10008',
    travelerName: 'Mia Rodriguez',
    travelerEmail: 'mia.rodriguez@demo.com',
    method: 'CARD',
    amount: 2740,
    currency: 'USD',
    status: 'SUCCESS',
    paidAt: '2026-02-06T14:14:00.000Z',
  },
  {
    id: 'PMT-50061',
    bookingId: 'BK-10004',
    travelerName: 'Ethan Walker',
    travelerEmail: 'ethan.walker@demo.com',
    method: 'CARD',
    amount: 1240,
    currency: 'USD',
    status: 'SUCCESS',
    paidAt: '2026-02-05T11:30:00.000Z',
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
  [...list].sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime());

const writePaymentHistory = (list) => {
  const normalized = sortByDateDesc(list);
  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  }
  return normalized;
};

export const getPaymentHistory = () => {
  if (!canUseStorage()) {
    return sortByDateDesc(seedPaymentHistory);
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);
  if (!storedValue) {
    return writePaymentHistory(seedPaymentHistory);
  }

  const parsed = parseStoredList(storedValue);
  if (!parsed) {
    return writePaymentHistory(seedPaymentHistory);
  }

  return sortByDateDesc(parsed);
};
