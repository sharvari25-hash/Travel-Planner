import React from 'react';
import { motion } from 'framer-motion';
import { FaClock } from 'react-icons/fa';
import SettingRow from './SettingRow';

const RegionalPreferences = () => (
  <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
  >
      <div>
          <h3 className="text-lg font-bold text-gray-800 mb-6">Regional Preferences</h3>
          <div className="space-y-3">
             <SettingRow 
                  icon="https://flagcdn.com/w40/in.png"
                  title="English"
                  value="INR - Indian Rupee"
             />
             <SettingRow 
                  icon={FaClock}
                  title="Time Format"
                  value="12-Hour 01:30 PM"
             />
          </div>
      </div>
      
      <button className="w-full mt-6 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-3 rounded-lg border border-gray-200 transition-colors flex items-center justify-center gap-2">
          + Add Activity
      </button>
  </motion.div>
);

export default RegionalPreferences;
