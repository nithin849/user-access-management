import React, { useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Auth Context
const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUser({ role: decoded.role });
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { username, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser({ role: data.role });
      navigate(data.role === 'Admin' ? '/create-software' : data.role === 'Manager' ? '/pending-requests' : '/request-access');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (username, password) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, { username, password });
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/request-access" element={<ProtectedRoute roles={['Employee']}><RequestAccessPage /></ProtectedRoute>} />
        <Route path="/pending-requests" element={<ProtectedRoute roles={['Manager']}><PendingRequestsPage /></ProtectedRoute>} />
        <Route path="/create-software" element={<ProtectedRoute roles={['Admin']}><CreateSoftwarePage /></ProtectedRoute>} />
      </Routes>
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ children, roles }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  return children;
}

// Render the app
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
