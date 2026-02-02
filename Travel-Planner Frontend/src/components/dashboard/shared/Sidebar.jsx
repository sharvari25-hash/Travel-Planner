import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Settings, Users, BarChart2 } from 'lucide-react';
import { cn } from '../../../lib/utils';

const travelerLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'My Trips', path: '/dashboard/my-trips', icon: Briefcase },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];

const adminLinks = [
  { name: 'Dashboard', path: '/admin', icon: BarChart2 },
  { name: 'User Management', path: '/admin/users', icon: Users },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

// This is a placeholder. In a real app, you'd get this from your AuthContext.
const USER_ROLE = 'USER'; // or 'ADMIN'

const Sidebar = () => {
  const location = useLocation();
  const links = USER_ROLE === 'ADMIN' ? adminLinks : travelerLinks;

  return (
    <div className="hidden md:flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-20 border-b">
        <Link to="/" className="text-primary font-primary font-bold text-3xl tracking-tight">
          Wander<span className="text-accent">Wise</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "flex items-center px-4 py-3 text-gray-600 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors",
                location.pathname === link.path && "bg-primary/10 text-primary font-semibold"
              )}
            >
              <link.icon className="w-5 h-5 mr-3" />
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
