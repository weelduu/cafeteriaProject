import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // For development persistence (optional, keeping in memory as requested)
  // logout on refresh unless we use sessionStorage
  
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    // sessionStorage.setItem('token', userToken); // Optional: if we want to survive refresh
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // sessionStorage.removeItem('token');
  };

  useEffect(() => {
    // Check if there's a token in session storage if we decide to use it
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, loading }}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
