import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string, callback?: any) => void;
  logout: () => void;
  token: string | null;
  userId: string | number | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.post(`${import.meta.env.VITE_APP_BASE_URL}/verifyToken`, { token })
        .then(response => {
          if (response.data.valid) {
            setIsAuthenticated(true);
            const decode = jwtDecode<CustomJwtPayload>(token);
            setUserId(decode.userId);
          } else {
            localStorage.removeItem('authToken');
          }
        })
        .catch(() => {
          localStorage.removeItem('authToken');
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/login`, {
      email,
      password
    }).then(response => {
      const decoded = jwtDecode<CustomJwtPayload>(response.data.token as string);

      if (decoded.userId) {
        setUserId(decoded.userId);
      }

      localStorage.setItem('authToken', response.data.token);
      setIsAuthenticated(true);
      location.href = '/panel';
    }).catch((error) => {
      alert('Login Failed.');
      console.error('Login failed', error);
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUserId(null);
    location.href = '/';
  };

  const token = localStorage.getItem('authToken');

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
