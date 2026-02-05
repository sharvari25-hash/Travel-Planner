import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaDollarSign, FaClock } from 'react-icons/fa';
import SelectField from './SelectField';

const ApplicationSettingsForm = () => (
  <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
  >
      <h3 className="text-lg font-bold text-gray-800 mb-6">Application Settings</h3>
      <div className="space-y-5">
          <SelectField 
              label="Language" 
              icon={FaGlobe} 
              options={['English', 'Spanish', 'French']} 
              defaultValue="English" 
          />
           <SelectField 
              label="Currency" 
              icon={FaDollarSign} 
              options={['USD - United States Dollar', 'EUR - Euro', 'JPY - Japanese Yen']} 
              defaultValue="USD - United States Dollar" 
          />
           <SelectField 
              label="Time Format" 
              icon={FaClock} 
              options={['12-Hour', '24-Hour']} 
              defaultValue="12-Hour" 
          />
          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-all">
              Save Changes
          </button>
      </div>
  </motion.div>
);

export default ApplicationSettingsForm;