import React, { useState } from 'react';
import { Search, Bell, ChevronDown, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import { useAuth } from '../../../lib/AuthContext';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login-customer');
  };

  if (!user) {
    // Render a loading state or null if user is not yet available
    return null; 
  }

  return (
    <header className="h-20 flex items-center justify-between bg-white shadow-md px-8">
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for trips, users, etc..."
          className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Right Side Icons & Profile */}
      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-primary">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">3</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2"
          >
            <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
            <div className="hidden md:flex flex-col items-start">
              <span className="font-semibold text-sm">{user.name}</span>
              <span className="text-xs text-gray-500">{user.role}</span>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {/* Dropdown Menu */}
          <div
            className={cn(
              "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-200",
              dropdownOpen ? "opacity-100 visible transform translate-y-0" : "opacity-0 invisible transform -translate-y-2"
            )}
          >
            <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-100">
              <User size={16} />
              Profile
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-gray-100">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
