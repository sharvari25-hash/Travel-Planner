import React from 'react';

const SidebarItem = ({ icon: Icon, text, active }) => (
  <div className={`flex items-center gap-4 px-6 py-4 cursor-pointer transition-all ${active ? 'bg-blue-700/50 border-r-4 border-blue-400 text-white' : 'hover:bg-blue-800/50 text-blue-200 hover:text-white'}`}>
    <Icon size={18} />
    <span className="font-medium text-sm">{text}</span>
  </div>
);

export default SidebarItem;