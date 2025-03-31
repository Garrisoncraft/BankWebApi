import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state to manage authentication
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }
    
      try {
        const res = await api.get('/auth/me');
        const userData = res.data.data;
        
        // Convert role to lowercase for consistency
        const normalizedUser = {
          ...userData,
          role: userData.role.toLowerCase(),
          isAdmin: userData.isAdmin
        };
        
        setUser(normalizedUser); 
      } catch (err) {
        console.error('Error fetching user data:', err.response?.data);
        setError(err.response?.data?.error || 'Authentication failed');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const authenticate = async (credentials, isSignup = false) => {
    try {
      const endpoint = isSignup ? '/auth/signup' : '/auth/signin';
      const res = await api.post(endpoint, credentials); 
      
      // Extract and normalize data
      const { token, ...userData } = res.data.data;
      const normalizedUser = {
        ...userData,
        role: userData.role.toLowerCase(),
        isAdmin: userData.isAdmin

      };

      // Store in localStorage and context
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(normalizedUser); // Set the user state with normalized data
      
      // Always navigate to homepage
      navigate('/');

    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Authentication failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'Logout failed');
    }
  };

  const contextValue = {
    user,
    loading,
    error,
    login: (credentials) => authenticate(credentials, false),
    signup: (credentials) => authenticate(credentials, true),
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
