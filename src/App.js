import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import PostFeed from './components/PostFeed';
import ShareActivity from './components/ShareActivity';
import Profile from './components/Profile';
import MyActivities from './components/MyActivities';
import PostEvent from './components/PostEvent';
import EventFeed from './components/EventFeed';
import MyEvents from './components/MyEvents';
import EventRequests from './components/EventRequests';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/Footer';
import './App.css';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/postfeed" element={<PostFeed />} />
      <Route path="/share-activity" element={<ShareActivity />} />
      
      {/* Event Routes */}
      <Route path="/post-event" element={isAuthenticated ? <PostEvent /> : <Navigate to="/login" />} />
      <Route path="/events" element={<EventFeed />} />
      <Route path="/my-events" element={isAuthenticated ? <MyEvents /> : <Navigate to="/login" />} />
      <Route path="/event-requests" element={isAuthenticated ? <EventRequests /> : <Navigate to="/login" />} />

      {/* Profile & Activities */}
      <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/myactivities" element={isAuthenticated ? <MyActivities /> : <Navigate to="/login" />} />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/postfeed" /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/postfeed" /> : <Register />}
      />
    </Routes>
  );
};

const App = () => (
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

export default App;
