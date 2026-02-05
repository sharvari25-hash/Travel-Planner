import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      </div>
      {Icon && <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-xl`}>{Icon}</div>}
    </div>
    <div className="mt-4 text-xs text-gray-400">{subtext}</div>
  </motion.div>
);

export default StatCard;