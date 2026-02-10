import React from 'react';
import { FaBell } from 'react-icons/fa';
import { useAuth } from '../../../lib/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-2 text-gray-700">
         <h2 className="font-bold text-xl">Wanderwise Admin</h2>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative">
            <FaBell className="text-gray-400 text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">2</span>
        </div>
        <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-700 font-medium">API Status: All Systems Operational</span>
        </div>
        <div className="flex items-center gap-3 pl-6 border-l cursor-pointer" onClick={handleLogout}>
            <img src="https://i.pravatar.cc/150?img=68" alt="Admin" className="w-8 h-8 rounded-full border border-gray-200" />
            <div className="text-sm">
                <span className="font-semibold block text-gray-700">Admin</span>
                <span className="text-gray-400 text-xs">Logout</span>
            </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
