import { useParams } from 'react-router-dom';
import { tours } from '../lib/tours';
import { Clock, Users, MapPin } from 'lucide-react';

const TourDetailsPage = () => {
  const { slug } = useParams();
  const tour = tours.find((tour) => tour.slug === slug);

  if (!tour) {
    return <div className="h-screen flex items-center justify-center">Tour not found!</div>;
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white">
        <img src={tour.img} alt={tour.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-primary font-bold mb-4">{tour.title}</h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto">{tour.desc}</p>
        </div>
      </section>

      {/* Tour Info Bar */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Clock className="w-8 h-8 text-primary mb-2" />
            <span className="font-semibold">Duration</span>
            <span className="text-gray-600">{tour.duration}</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-8 h-8 text-primary mb-2" />
            <span className="font-semibold">Group Size</span>
            <span className="text-gray-600">{tour.maxGroupSize} people</span>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="w-8 h-8 text-primary mb-2" />
            <span className="font-semibold">Location</span>
            <span className="text-gray-600">Banff, Canada</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-primary">${tour.price}</span>
            <span className="font-semibold">per person</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Side - Itinerary */}
          <div className="md:col-span-2">
            <h2 className="text-4xl font-primary font-semibold mb-8">Tour Details</h2>
            <div className="prose max-w-none">
              <p className="text-lg mb-6">{tour.overview}</p>
              
              <h3 className="text-3xl font-primary font-semibold mt-12 mb-6">Itinerary</h3>
              <div className="space-y-8 border-l-2 border-gray-200 ml-2">
                {tour.itinerary.map((day, index) => (
                  <div key={index} className="relative pl-8">
                    <div className="absolute -left-2.5 top-1.5 w-5 h-5 bg-primary rounded-full"></div>
                    <h4 className="text-2xl font-semibold mb-2">Day {day.day}: {day.title}</h4>
                    <p className="text-gray-700">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Booking Form */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg sticky top-24">
              <h3 className="text-2xl font-primary font-semibold mb-6">Book This Tour</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                  <input type="date" id="date" name="date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label htmlFor="travelers" className="block text-sm font-medium text-gray-700">Number of Travelers</label>
                  <input type="number" id="travelers" name="travelers" min="1" max={tour.maxGroupSize} defaultValue="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-dark transition-colors">
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
