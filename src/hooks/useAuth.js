// src/hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';

const MOCK_CREDENTIALS = { username: 'star', password: 'coder' };
const TOKEN_KEY = 'mockAuthToken';
const REFRESH_INTERVAL = 60000; 

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  
 
  useEffect(() => {
    let interval;
    if (token) {
      interval = setInterval(() => {
        
        console.log('Mock JWT: Silently refreshing token...');
      }, REFRESH_INTERVAL);
    }
    return () => clearInterval(interval);
  }, [token]);

  
  const login = useCallback((username, password) => {
    if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
      const mockToken = `mock-jwt-${Math.random().toString(36).substring(2)}`;
      localStorage.setItem(TOKEN_KEY, mockToken);
      setToken(mockToken);
      return true;
    }
    return false;
  }, []);

  
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  return {
    isLoggedIn: !!token,
    login,
    logout,
  };
};