import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext<{
  user: any;
  cartLength: number;
  setCartLength: (length: number) => void;
  login: (userData: any) => Promise<void>;
  logout: () => void;
}>({
  user: null,
  cartLength: 0,
  setCartLength: () => {},
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [cartLength, setCartLength] = useState(0);

  const login = async (userId: any) => {
    // Perform login logic (e.g., authenticate and fetch user data)
    setUser(userId);
    setCartLength(0); // Reset cart length on login
    // Fetch the actual cart length for the user
    const token = localStorage.getItem('token') || ''; 
    const response = await axios.get(`http://localhost:1337/api/carts`, {
      params: {
        'filters[userId][$eq]': userId.id,
        'populate': '*'
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      const items = response.data;
      setCartLength(items?.meta?.pagination?.total || 0);
    }
  };

  const logout = () => {
    setUser(null);
    setCartLength(0); // Reset cart length on logout
  };

  return (
    <AuthContext.Provider value={{ user, cartLength, setCartLength, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
