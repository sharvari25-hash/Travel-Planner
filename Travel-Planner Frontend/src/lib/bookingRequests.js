const STORAGE_KEY = 'adminBookingRequests';

const seedBookingRequests = [
  {
    id: 'BK-10021',
    travelerName: 'Demo Traveler',
    travelerEmail: 'traveler@demo.com',
    destination: 'Kyoto',
    country: 'Japan',
    travelDate: '2026-03-24',
    transportation: 'van',
    travelersCount: 2,
    status: 'PENDING',
    requestedAt: '2026-02-10T07:30:00.000Z',
    adminNote: '',
  },
  {
    id: 'BK-10019',
    travelerName: 'Liam Carter',
    travelerEmail: 'liam.carter@demo.com',
    destination: 'Bali',
    country: 'Indonesia',
    travelDate: '2026-03-18',
    transportation: 'suv',
    travelersCount: 3,
    status: 'APPROVED',
    requestedAt: '2026-02-09T15:20:00.000Z',
    adminNote: 'Confirmed with preferred dates.',
  },
  {
    id: 'BK-10015',
    travelerName: 'Sophia Patel',
    travelerEmail: 'sophia.patel@demo.com',
    destination: 'Istanbul',
    country: 'Turkey',
    travelDate: '2026-03-01',
    transportation: 'bus',
    travelersCount: 1,
    status: 'REJECTED',
    requestedAt: '2026-02-08T11:10:00.000Z',
    adminNote: 'Requested date unavailable. Please choose another date.',
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

const sortByRequestedAtDesc = (list) =>
  [...list].sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());

const writeBookingRequests = (list) => {
  if (!canUseStorage()) {
    return sortByRequestedAtDesc(list);
  }

  const normalized = sortByRequestedAtDesc(list);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
};

export const getBookingRequests = () => {
  if (!canUseStorage()) {
    return sortByRequestedAtDesc(seedBookingRequests);
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);
  if (!storedValue) {
    return writeBookingRequests(seedBookingRequests);
  }

  const parsed = parseStoredList(storedValue);
  if (!parsed) {
    return writeBookingRequests(seedBookingRequests);
  }

  return sortByRequestedAtDesc(parsed);
};

const createBookingId = () => `BK-${String(Date.now()).slice(-6)}`;

export const createBookingRequest = ({
  travelerName,
  travelerEmail,
  destination,
  country,
  travelDate,
  transportation,
  travelers,
}) => {
  const travelersCount = Array.isArray(travelers) ? travelers.length : 1;
  const newRequest = {
    id: createBookingId(),
    travelerName,
    travelerEmail,
    destination,
    country,
    travelDate,
    transportation,
    travelersCount,
    status: 'PENDING',
    requestedAt: new Date().toISOString(),
    adminNote: '',
  };

  const current = getBookingRequests();
  writeBookingRequests([newRequest, ...current]);
  return newRequest;
};

const allowedStatuses = ['PENDING', 'APPROVED', 'REJECTED'];

export const updateBookingRequestStatus = (requestId, status, adminNote = '') => {
  if (!allowedStatuses.includes(status)) {
    return getBookingRequests();
  }

  const updated = getBookingRequests().map((entry) =>
    entry.id === requestId ? { ...entry, status, adminNote } : entry
  );

  return writeBookingRequests(updated);
};

export const deleteBookingRequest = (requestId) => {
  const updated = getBookingRequests().filter((entry) => entry.id !== requestId);
  return writeBookingRequests(updated);
};
