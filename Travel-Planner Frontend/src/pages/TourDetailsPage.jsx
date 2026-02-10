import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getWeather } from '../lib/weatherService';
import { useAuth } from '../lib/AuthContext';
import { formatInr, getTourPricePerTraveler } from '../lib/pricing';
import { Calendar, Users, Globe, PlusCircle, XCircle } from 'lucide-react';

const PENDING_BOOKING_STORAGE_KEY = 'pendingTourBookingCheckout';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');

const parseJsonSafe = async (response) => {
  try {
    return await response.json();
  } catch (_error) {
    return null;
  }
};

const bookingSchema = yup.object({
  date: yup.date().required('Date is required').min(new Date(), 'Date cannot be in the past'),
  transportation: yup.string().required('Transportation is required'),
  travelers: yup.array().of(
    yup.object({
      name: yup.string().required('Name is required'),
      age: yup.number().typeError('Age must be a number').required('Age is required').min(1).max(120),
      gender: yup.string().required('Gender is required'),
    })
  ).min(1, 'At least one traveler is required'),
}).required();

const TourDetailsPage = () => {
  const { destination, subDestination } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [toursCatalog, setToursCatalog] = useState([]);
  const [isTourLoading, setIsTourLoading] = useState(true);
  const [tourFetchError, setTourFetchError] = useState(null);
  const requestedTourPath = useMemo(
    () => [destination, subDestination].filter(Boolean).join('/'),
    [destination, subDestination]
  );
  const tour = useMemo(
    () =>
      toursCatalog.find(
        (entry) => entry.destination.toLowerCase().replace(/\s/g, '-') === requestedTourPath
      ),
    [toursCatalog, requestedTourPath]
  );
  
  const [weather, setWeather] = useState(null);
  const canBookAsTraveler = isAuthenticated && user?.role === 'USER';
  const tourPricePerTraveler = useMemo(() => getTourPricePerTraveler(tour), [tour]);

  useEffect(() => {
    const loadTours = async () => {
      setIsTourLoading(true);
      setTourFetchError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/api/tours`);
        const payload = await parseJsonSafe(response);

        if (!response.ok) {
          setTourFetchError(payload?.message || 'Unable to load tour data.');
          setToursCatalog([]);
          return;
        }

        if (!Array.isArray(payload)) {
          setTourFetchError('Invalid tour response from backend.');
          setToursCatalog([]);
          return;
        }

        setToursCatalog(payload);
      } catch (_error) {
        setTourFetchError('Unable to connect to backend server.');
        setToursCatalog([]);
      } finally {
        setIsTourLoading(false);
      }
    };

    loadTours();
  }, []);

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      travelers: [{ name: '', age: '', gender: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'travelers',
  });

  useEffect(() => {
    if (tour) {
      setWeather(getWeather(tour.destination));
    }
  }, [tour]);

  if (isTourLoading) {
    return <div className="h-screen flex items-center justify-center">Loading tour details...</div>;
  }

  if (tourFetchError) {
    return <div className="h-screen flex items-center justify-center">{tourFetchError}</div>;
  }

  if (!tour) {
    return <div className="h-screen flex items-center justify-center">Tour not found!</div>;
  }

  const onSubmit = (data) => {
    if (!isAuthenticated || user?.role !== 'USER') {
      navigate('/login', { state: { from: location } });
      return;
    }

    const pendingBooking = {
      travelerName: user.name,
      travelerEmail: user.email,
      destination: tour.destination,
      country: tour.country,
      travelDate: data.date,
      transportation: data.transportation,
      travelers: data.travelers,
      amountPerTraveler: tourPricePerTraveler,
      currency: 'INR',
      submittedAt: new Date().toISOString(),
    };

    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(PENDING_BOOKING_STORAGE_KEY, JSON.stringify(pendingBooking));
    }

    navigate('/user/payment/demo', { state: { pendingBooking } });
  };

  const handleFormSubmit = (event) => {
    if (!canBookAsTraveler) {
      event.preventDefault();
      navigate('/login', { state: { from: location } });
      return;
    }

    handleSubmit(onSubmit)(event);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white">
        <img src={tour.img} alt={tour.destination} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-primary font-bold mb-4">{tour.destination}, {tour.country}</h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto">{tour.description}</p>
        </div>
      </section>

      {/* Tour Info Bar */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Calendar className="w-8 h-8 text-primary mb-2" />
            <span className="font-semibold">Duration</span>
            <span className="text-gray-600">{tour.duration} Days</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-8 h-8 text-primary mb-2" />
            <span className="font-semibold">Category</span>
            <span className="text-gray-600">{tour.category}</span>
          </div>
          <div className="flex flex-col items-center">
            <Globe className="w-8 h-8 text-primary mb-2" />
            <span className="font-semibold">Location</span>
            <span className="text-gray-600">{tour.country}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-primary">{formatInr(tourPricePerTraveler)}</span>
            <span className="font-semibold">per person</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Side - Itinerary */}
          <div className="md:col-span-2">
            
            {/* Weather Widget */}
            {weather && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                <h3 className="text-2xl font-primary font-semibold mb-4">Local Weather Forecast</h3>
                <div className="flex items-center gap-6 mb-6">
                  <div className="text-5xl">{weather.current.icon}</div>
                  <div>
                    <div className="text-3xl font-bold">{weather.current.temp}°C</div>
                    <div className="text-gray-600">{weather.current.condition}</div>
                  </div>
                  <div className="ml-auto text-sm text-gray-500 space-y-1">
                    <div>Humidity: {weather.current.humidity}%</div>
                    <div>Wind: {weather.current.windSpeed} km/h</div>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 text-center border-t pt-4">
                  {weather.forecast.map((day, idx) => (
                    <div key={idx}>
                      <div className="text-sm font-semibold text-gray-500">{day.day}</div>
                      <div className="text-2xl my-1">{day.icon}</div>
                      <div className="font-medium">{day.temp}°C</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h2 className="text-4xl font-primary font-semibold mb-8">Tour Details</h2>
            <div className="prose max-w-none">
              <p className="text-lg mb-6">{tour.description}</p>
              
              <h3 className="text-3xl font-primary font-semibold mt-12 mb-6">Itinerary ({tour.duration} Days)</h3>
              <div className="space-y-4 border-l-2 border-gray-200 ml-2">
                {tour.plan.map((day, index) => (
                  <div key={index} className="relative pl-8">
                    <div className="absolute -left-2 top-2 w-4 h-4 bg-primary rounded-full"></div>
                    <p className="text-gray-700">{day}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg sticky top-24">
              <h3 className="text-2xl font-primary font-semibold mb-6">Book This Tour</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                  <input type="date" id="date" {...register("date")} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                </div>

                <div>
                  <label htmlFor="transportation" className="block text-sm font-medium text-gray-700">Mode of Transportation</label>
                  <select id="transportation" {...register("transportation")} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                    <option value="">Select a mode</option>
                    <option value="suv">Luxury SUV</option>
                    <option value="van">Comfort Van</option>
                    <option value="bus">Shuttle Bus</option>
                  </select>
                  {errors.transportation && <p className="text-red-500 text-sm mt-1">{errors.transportation.message}</p>}
                </div>

                <hr />

                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-800">Travelers</h4>
                  {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-md bg-white space-y-3">
                      <div className="flex justify-between items-center">
                        <h5 className="font-semibold">Traveler {index + 1}</h5>
                        {fields.length > 1 && (
                          <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700">
                            <XCircle size={20} />
                          </button>
                        )}
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <input {...register(`travelers.${index}.name`)} placeholder="Full Name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                        {errors.travelers?.[index]?.name && <p className="text-red-500 text-sm mt-1">{errors.travelers[index].name.message}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-600">Age</label>
                          <input type="number" {...register(`travelers.${index}.age`)} placeholder="Age" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                          {errors.travelers?.[index]?.age && <p className="text-red-500 text-sm mt-1">{errors.travelers[index].age.message}</p>}
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Gender</label>
                          <select {...register(`travelers.${index}.gender`)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.travelers?.[index]?.gender && <p className="text-red-500 text-sm mt-1">{errors.travelers[index].gender.message}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                  {fields.length < 10 && (
                    <button type="button" onClick={() => append({ name: '', age: '', gender: '' })} className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <PlusCircle size={16} />
                      Add Traveler
                    </button>
                  )}
                </div>

                <hr />

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-accent transition-colors font-semibold"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TourDetailsPage;
