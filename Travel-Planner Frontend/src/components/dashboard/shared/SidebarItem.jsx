import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, text, active, hasSubmenu, to, onClick }) => {
  const content = (
    <div className={`flex items-center justify-between px-6 py-3 cursor-pointer transition-colors ${active ? 'bg-accent/20 border-l-4 border-accent text-white' : 'hover:bg-white/10 text-white/80'}`}>
      <div className="flex items-center gap-3">
        <Icon size={18} />
        <span className="font-medium text-sm">{text}</span>
      </div>
      {hasSubmenu && <FaChevronDown className="text-[10px] opacity-70 text-accent" aria-hidden="true" />}
    </div>
  );

  if (to) {
    return <Link to={to} onClick={onClick}>{content}</Link>;
  }

  return (
    <button type="button" onClick={onClick} className="w-full text-left">
      {content}
    </button>
  );
};

export default SidebarItem;
