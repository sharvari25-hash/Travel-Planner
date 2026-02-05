import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();
  return (
    <div className="h-[50vh] flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <p>The requested URL <code>{location.pathname}</code> was not found.</p>
      </div>
    </div>
  );
};

export default NotFound;
