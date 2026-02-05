import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ children, className }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between ${className}`}
  >
    {children}
  </motion.div>
);

export default StatCard;