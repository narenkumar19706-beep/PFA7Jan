import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'pfa_auth_state';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        if (authData.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(authData.user);
        }
      } catch (error) {
        console.error('Error parsing auth state:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    const authData = {
      isAuthenticated: true,
      user: userData || {
        name: 'Ananya Rao',
        phone: '+91 9876543210',
        role: 'individual',
        joinedDays: 120
      }
    };
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    setIsAuthenticated(true);
    setUser(authData.user);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = (userData) => {
    const newUser = { ...user, ...userData };
    const authData = {
      isAuthenticated: true,
      user: newUser
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      isLoading,
      login,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
