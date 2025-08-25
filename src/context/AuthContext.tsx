import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  setLogoutCallback: (callback: () => void) => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Use HTTP for development backend
const API_BASE_URL = 'http://localhost:8000/api/v1';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [logoutCallback, setLogoutCallback] = useState<(() => void) | null>(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication for development
      const mockUsers = [
        { email: 'admin@gmail.com', password: 'admin12345', id: 1, name: 'Admin User', role: 'admin' },
        { email: 'User@gmail.com', password: 'user12345', id: 2, name: 'Customer User', role: 'customer' },
        { email: 'superadmin@tastybite.com', password: 'superadmin2024', id: 3, name: 'Super Admin', role: 'admin' }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers.find(u => u.email === email && u.password === password);

      if (user) {
        const userData = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };

        const mockToken = `mock-token-${user.id}-${Date.now()}`;

        setUser(userData);
        setToken(mockToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', mockToken);
        return true;
      } else {
        console.error('Login failed: Invalid credentials');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Call the logout callback if it exists (for navigation)
    if (logoutCallback) {
      logoutCallback();
    }
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user && !!token,
    setLogoutCallback,
    token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
