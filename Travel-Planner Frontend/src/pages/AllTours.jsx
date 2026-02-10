import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useToursCatalog } from '../lib/toursCatalog';
import { formatInr, getTourPricePerTraveler } from '../lib/pricing';

const TOUR_CATEGORIES = ['All', 'Family', 'Couple', 'Adventure', 'Culture'];

const AllTours = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const toursCatalog = useToursCatalog();
  const toursPerPage = 9;
  const categoryFromQuery = searchParams.get('category');
  const activeCategory = TOUR_CATEGORIES.includes(categoryFromQuery) ? categoryFromQuery : 'All';

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const filteredTours = activeCategory === 'All' 
    ? toursCatalog
    : toursCatalog.filter((tour) => tour.category === activeCategory);

  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

  const totalPages = Math.ceil(filteredTours.length / toursPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleCategoryClick = (category) => {
    const nextParams = new URLSearchParams(searchParams);

    if (category === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', category);
    }

    setSearchParams(nextParams);
  };

  return (
    <div className="bg-gray-50 py-20 pt-32">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-primary font-bold text-primary mb-4">All Tours</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
            Browse our complete collection of handcrafted tours and find your next adventure.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {TOUR_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentTours.map((tour, idx) => (
            <div key={idx} className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden w-full aspect-[4/3]">
                <img 
                  src={tour.img}
                  alt={tour.destination} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">{tour.category}</div>
              </div>
              <div className="p-6 flex flex-col items-center flex-grow">
                <h5 className="text-xl font-primary font-semibold text-center mb-3 max-w-xs">{tour.destination}, {tour.country}</h5>
                {tour.description && (
                  <p className="text-center text-gray-600 mb-5 px-4 text-sm">{tour.description}</p>
                )}
                <div className="mt-auto w-full flex justify-between items-center">
                  <p className="text-lg font-bold text-primary">
                    {formatInr(getTourPricePerTraveler(tour))}
                  </p>
                  <Link 
                    to={`/tours/${tour.destination.toLowerCase().replace(/\s/g, "-")}`}
                    className="px-6 py-2 rounded-full border border-dark text-dark hover:bg-dark hover:text-white transition-colors text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-16">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 mx-1 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-4 py-2 mx-1 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllTours;
