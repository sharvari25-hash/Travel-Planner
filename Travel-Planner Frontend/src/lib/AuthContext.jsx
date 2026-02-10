import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (_error) {
      localStorage.removeItem('user');
      return null;
    }
  });

  const login = (email, password) => {
    // Demo credentials
    const credentials = {
      'traveler@demo.com': { password: 'password', role: 'USER', name: 'Demo Traveler' },
      'admin@demo.com': { password: 'password', role: 'ADMIN', name: 'Demo Admin' },
    };

    const userData = credentials[email];

    if (userData && userData.password === password) {
      const userProfile = {
        email,
        role: userData.role,
        name: userData.name,
        avatar: `https://i.pravatar.cc/150?u=${email}`
      };
      setUser(userProfile);
      localStorage.setItem('user', JSON.stringify(userProfile));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
