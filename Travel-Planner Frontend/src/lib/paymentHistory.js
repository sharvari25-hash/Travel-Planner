const STORAGE_KEY = 'adminPaymentHistory';
const STORAGE_VERSION_KEY = 'adminPaymentHistoryVersion';
const STORAGE_VERSION = '2';

const seedPaymentHistory = [
  {
    id: 'PMT-50091',
    bookingId: 'BK-10021',
    travelerName: 'Demo Traveler',
    travelerEmail: 'traveler@demo.com',
    method: 'CARD',
    amount: 285000,
    currency: 'INR',
    status: 'PENDING',
    paidAt: '2026-02-10T09:20:00.000Z',
  },
  {
    id: 'PMT-50087',
    bookingId: 'BK-10019',
    travelerName: 'Liam Carter',
    travelerEmail: 'liam.carter@demo.com',
    method: 'UPI',
    amount: 412000,
    currency: 'INR',
    status: 'SUCCESS',
    paidAt: '2026-02-09T16:42:00.000Z',
  },
  {
    id: 'PMT-50080',
    bookingId: 'BK-10015',
    travelerName: 'Sophia Patel',
    travelerEmail: 'sophia.patel@demo.com',
    method: 'CARD',
    amount: 198000,
    currency: 'INR',
    status: 'REFUNDED',
    paidAt: '2026-02-08T12:10:00.000Z',
  },
  {
    id: 'PMT-50072',
    bookingId: 'BK-10011',
    travelerName: 'Noah Kim',
    travelerEmail: 'noah.kim@demo.com',
    method: 'BANK_TRANSFER',
    amount: 265000,
    currency: 'INR',
    status: 'FAILED',
    paidAt: '2026-02-07T18:05:00.000Z',
  },
  {
    id: 'PMT-50066',
    bookingId: 'BK-10008',
    travelerName: 'Mia Rodriguez',
    travelerEmail: 'mia.rodriguez@demo.com',
    method: 'CARD',
    amount: 534000,
    currency: 'INR',
    status: 'SUCCESS',
    paidAt: '2026-02-06T14:14:00.000Z',
  },
  {
    id: 'PMT-50061',
    bookingId: 'BK-10004',
    travelerName: 'Ethan Walker',
    travelerEmail: 'ethan.walker@demo.com',
    method: 'CARD',
    amount: 228000,
    currency: 'INR',
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

const normalizePaymentRecord = (entry) => ({
  ...entry,
  amount: Number(entry.amount) || 0,
  currency: 'INR',
});

const sortByDateDesc = (list) =>
  [...list]
    .map(normalizePaymentRecord)
    .sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime());

const writePaymentHistory = (list) => {
  const normalized = sortByDateDesc(list);
  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
  }
  return normalized;
};

export const getPaymentHistory = () => {
  if (!canUseStorage()) {
    return sortByDateDesc(seedPaymentHistory);
  }

  const storedVersion = window.localStorage.getItem(STORAGE_VERSION_KEY);
  if (storedVersion !== STORAGE_VERSION) {
    return writePaymentHistory(seedPaymentHistory);
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

const createPaymentId = () => `PMT-${String(Date.now()).slice(-6)}`;

export const createPaymentRecord = ({
  bookingId,
  travelerName,
  travelerEmail,
  method = 'CARD',
  amount = 0,
  currency = 'INR',
  status = 'SUCCESS',
}) => {
  const current = getPaymentHistory();
  const payment = {
    id: createPaymentId(),
    bookingId,
    travelerName,
    travelerEmail,
    method,
    amount: Number(amount) || 0,
    currency,
    status,
    paidAt: new Date().toISOString(),
  };

  writePaymentHistory([payment, ...current]);
  return payment;
};
