import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import PostFeed from './components/PostFeed';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

// Create a separate component for the routes to access auth context
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/postfeed" element={<PostFeed />} />
      
      {/* Auth Routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to="/" /> : <Register />} 
      />
      
      {/* Protected Routes would go here */}
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="content">
          <AppRoutes />
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;