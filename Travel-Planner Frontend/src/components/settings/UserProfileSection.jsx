import React from 'react';
import { motion } from 'framer-motion';
import { FaCamera } from 'react-icons/fa';
import InputField from './InputField';

const UserProfileSection = () => (
  <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8"
  >
      <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">User Profile</h3>
          
          <div className="flex flex-col lg:flex-row gap-8">
              {/* Avatar Column */}
              <div className="flex flex-col items-center gap-4 lg:w-48 lg:border-r lg:pr-8 border-gray-100">
                  <div className="relative">
                      <img 
                          src="https://i.pravatar.cc/300?img=12" 
                          alt="John Smith" 
                          className="w-32 h-32 rounded-full object-cover border-4 border-blue-50"
                      />
                      <button className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full border-2 border-white shadow-sm hover:bg-blue-700">
                          <FaCamera size={12} />
                      </button>
                  </div>
                  <div className="text-center">
                      <h2 className="font-bold text-gray-800 text-lg">John Smith</h2>
                      <button className="text-blue-600 text-sm font-medium hover:underline mt-1">Change Profile Picture</button>
                  </div>
              </div>

              {/* Form Column */}
              <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Full Name" defaultValue="John Smith" action="Edit" />
                      <InputField label="Email Address" defaultValue="johnsmith@email.com" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="Email Address" defaultValue="johnsmith@email.com" readOnly />
                      <InputField label="Phone Number" defaultValue="+1 555-123-4567" />
                  </div>

                  <div className="pt-2">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all shadow-lg shadow-blue-200">
                          Save Changes
                      </button>
                  </div>
              </div>
          </div>
      </div>
  </motion.div>
);

export default UserProfileSection;