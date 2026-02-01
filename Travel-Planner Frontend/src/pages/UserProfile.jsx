import React from 'react';

const UserProfile = () => {
  // Dummy data for now, will be replaced with actual user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-lg">{user.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-lg">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <p className="mt-1 text-lg">{user.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
