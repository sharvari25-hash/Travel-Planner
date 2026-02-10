import { useEffect, useState } from 'react';
import { allToursData } from './AllToursData';

const STORAGE_KEY = 'adminToursCatalog';
export const TOURS_CATALOG_UPDATED_EVENT = 'tours-catalog-updated';

const defaultWeatherProfile = {
  baseTemp: 20,
  baseHumidity: 50,
  baseWind: 10,
  defaultCondition: 'Partly Cloudy',
};

const slugify = (value = '') =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

const toSafeNumber = (value, fallback) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
};

const buildFallbackPlan = (duration, destination = 'Destination') =>
  Array.from({ length: duration }, (_item, index) => `Day ${index + 1}: Explore ${destination}`);

const normalizePlan = (plan, duration, destination) => {
  const list = Array.isArray(plan)
    ? plan.map((item) => String(item).trim()).filter(Boolean)
    : [];

  if (list.length >= duration) {
    return list.slice(0, duration);
  }

  const fallback = buildFallbackPlan(duration, destination);
  return [...list, ...fallback.slice(list.length, duration)];
};

const normalizeTour = (tour, index = 0) => {
  const destination = String(tour?.destination || '').trim();
  const country = String(tour?.country || '').trim();
  const category = String(tour?.category || 'Adventure').trim();
  const duration = Math.max(1, toSafeNumber(tour?.duration, 5));
  const id =
    tour?.id ||
    `tour-${slugify(destination)}-${slugify(country)}-${String(index + 1).padStart(2, '0')}`;

  return {
    id,
    destination,
    country,
    category,
    description: String(tour?.description || '').trim(),
    duration,
    img: String(tour?.img || '').trim(),
    plan: normalizePlan(tour?.plan, duration, destination),
    weatherProfile: {
      ...defaultWeatherProfile,
      ...(tour?.weatherProfile || {}),
    },
  };
};

const normalizeTours = (list) =>
  Array.isArray(list) ? list.map((tour, index) => normalizeTour(tour, index)) : [];

const seedTours = normalizeTours(allToursData);

const canUseStorage = () =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const parseStoredList = (rawValue) => {
  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : null;
  } catch (_error) {
    return null;
  }
};

const emitToursUpdated = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new Event(TOURS_CATALOG_UPDATED_EVENT));
};

const writeToursCatalog = (list) => {
  const normalized = normalizeTours(list);

  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    emitToursUpdated();
  }

  return normalized;
};

export const getToursCatalog = () => {
  if (!canUseStorage()) {
    return seedTours;
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);
  if (!storedValue) {
    return writeToursCatalog(seedTours);
  }

  const parsed = parseStoredList(storedValue);
  if (!parsed) {
    return writeToursCatalog(seedTours);
  }

  return normalizeTours(parsed);
};

export const createTourInCatalog = (tourInput) => {
  const current = getToursCatalog();
  const created = normalizeTour(
    {
      ...tourInput,
      id: `tour-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    },
    current.length
  );

  writeToursCatalog([created, ...current]);
  return created;
};

export const updateTourInCatalog = (tourId, updates) => {
  const current = getToursCatalog();

  const updatedList = current.map((entry, index) =>
    entry.id === tourId
      ? normalizeTour(
          {
            ...entry,
            ...updates,
            id: entry.id,
            weatherProfile: {
              ...defaultWeatherProfile,
              ...(entry.weatherProfile || {}),
              ...(updates.weatherProfile || {}),
            },
          },
          index
        )
      : entry
  );

  writeToursCatalog(updatedList);
  return updatedList.find((entry) => entry.id === tourId) || null;
};

export const useToursCatalog = () => {
  const [tours, setTours] = useState(() => getToursCatalog());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const syncTours = () => setTours(getToursCatalog());

    window.addEventListener(TOURS_CATALOG_UPDATED_EVENT, syncTours);
    window.addEventListener('storage', syncTours);

    return () => {
      window.removeEventListener(TOURS_CATALOG_UPDATED_EVENT, syncTours);
      window.removeEventListener('storage', syncTours);
    };
  }, []);

  return tours;
};
