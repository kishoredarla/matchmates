import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const [userId, setUserId] = useState(localStorage.getItem('user_id') || null);

  const login = (token, user_id) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user_id);
    setUserId(user_id);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Fix: You MUST export this!
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
