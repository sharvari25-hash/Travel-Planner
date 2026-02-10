import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');

const readStoredUser = () => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (_error) {
    localStorage.removeItem('user');
    return null;
  }
};

const parseJsonSafe = async (response) => {
  try {
    return await response.json();
  } catch (_error) {
    return null;
  }
};

const mapUserProfile = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.mobileNumber || '',
  mobileNumber: user.mobileNumber || '',
  avatar: user.avatar || `https://i.pravatar.cc/150?u=${user.email}`,
});

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('authToken');
  const [user, setUser] = useState(() => (storedToken ? readStoredUser() : null));
  const [token, setToken] = useState(storedToken);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const persistSession = (payload) => {
    const profile = mapUserProfile(payload.user);
    setUser(profile);
    setToken(payload.token);
    localStorage.setItem('user', JSON.stringify(profile));
    localStorage.setItem('authToken', payload.token);
    return profile;
  };

  const login = async (email, password) => {
    setIsAuthLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = await parseJsonSafe(response);
      if (!response.ok) {
        return {
          success: false,
          message: payload?.message || 'Invalid email or password',
        };
      }

      if (!payload?.token || !payload?.user) {
        return {
          success: false,
          message: 'Invalid server response',
        };
      }

      const profile = persistSession(payload);
      return { success: true, user: profile };
    } catch (_error) {
      return {
        success: false,
        message: 'Unable to connect to backend server',
      };
    } finally {
      setIsAuthLoading(false);
    }
  };

  const signup = async ({ name, email, password, mobileNumber, role }) => {
    setIsAuthLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          mobileNumber,
          role,
        }),
      });

      const payload = await parseJsonSafe(response);
      if (!response.ok) {
        return {
          success: false,
          message: payload?.message || 'Signup failed',
        };
      }

      if (!payload?.token || !payload?.user) {
        return {
          success: false,
          message: 'Invalid server response',
        };
      }

      const profile = persistSession(payload);
      return { success: true, user: profile };
    } catch (_error) {
      return {
        success: false,
        message: 'Unable to connect to backend server',
      };
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  const updateUserProfile = (updates) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      const nextUser = {
        ...currentUser,
        ...updates,
      };

      localStorage.setItem('user', JSON.stringify(nextUser));
      return nextUser;
    });
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isAuthLoading,
    login,
    signup,
    updateUserProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
