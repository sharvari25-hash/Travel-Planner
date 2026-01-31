function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-800">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-sky-600">
          WanderWise
        </h1>

        <ul className="hidden md:flex gap-8 font-medium">
          <li className="hover:text-sky-500 cursor-pointer">Home</li>
          <li className="hover:text-sky-500 cursor-pointer">Destinations</li>
          <li className="hover:text-sky-500 cursor-pointer">Trips</li>
          <li className="hover:text-sky-500 cursor-pointer">Contact</li>
        </ul>

        <button className="bg-sky-500 text-white px-5 py-2 rounded-lg hover:bg-sky-600 transition">
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-24">
        <h2 className="text-4xl md:text-6xl font-bold">
          Plan Your Next Adventure
        </h2>
        <p className="mt-5 max-w-xl text-gray-600">
          Discover destinations, organize trips, and travel smarter with
          WanderWise — your personal travel planner.
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex w-full max-w-md">
          <input
            type="text"
            placeholder="Search destination..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-xl focus:outline-none"
          />
          <button className="bg-sky-500 px-6 text-white rounded-r-xl hover:bg-sky-600">
            Search
          </button>
        </div>

        <button className="mt-6 bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-gray-800">
          Start Planning
        </button>
      </section>

      {/* Popular Destinations */}
      <section className="px-8 pb-20">
        <h3 className="text-2xl font-semibold text-center mb-10">
          Popular Destinations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {[
            { name: "Paris", country: "France" },
            { name: "Bali", country: "Indonesia" },
            { name: "Dubai", country: "UAE" },
          ].map((place, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5"
            >
              <div className="h-40 bg-sky-100 rounded-xl flex items-center justify-center text-sky-500 font-semibold">
                Image
              </div>
              <h4 className="mt-4 text-lg font-semibold">
                {place.name}
              </h4>
              <p className="text-gray-500">{place.country}</p>
              <button className="mt-4 text-sky-500 font-medium hover:underline">
                View Trip →
              </button>
            </div>
          ))}

        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 border-t">
        © 2026 WanderWise · Travel Smart
      </footer>

    </div>
  );
}

export default App;
