import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, text, active, hasSubmenu, to }) => {
  const content = (
    <div className={`flex items-center justify-between px-6 py-3 cursor-pointer transition-colors ${active ? 'bg-blue-800 border-l-4 border-blue-400' : 'hover:bg-blue-800/50 text-gray-300'}`}>
      <div className="flex items-center gap-3">
        <Icon size={18} />
        <span className="font-medium text-sm">{text}</span>
      </div>
      {hasSubmenu && <FaChevronDown className="text-[10px] opacity-70" aria-hidden="true" />}
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
};

export default SidebarItem;
