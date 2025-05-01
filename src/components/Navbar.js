import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const publicNavItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  const privateNavItems = [
    { path: '/postfeed', label: 'Hobbies' },
    { path: '/share-activity', label: 'Share Activity' },
    { path: '/myactivities', label: 'My Activities' },
    { path: '/post-event', label: 'Post Event' },
    { path: '/events', label: 'Events' },
    { path: '/my-events', label: 'My Events' },
    { path: '/event-requests', label: 'Event Requests' },
  ];

  const navItems = isAuthenticated ? privateNavItems : publicNavItems;

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="logo">
        <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
          <h1>MatchMates</h1>
        </NavLink>
      </div>

      <button
        className="mobile-menu-button"
        onClick={toggleMobileMenu}
        aria-expanded={isMobileMenuOpen}
        aria-label="Menu"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        {navItems.map(({ path, label }) => (
          <li key={path} onClick={() => setIsMobileMenuOpen(false)}>
            <NavLink
              to={path}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {label}
            </NavLink>
          </li>
        ))}

        {isAuthenticated ? (
          <>
            <li onClick={() => setIsMobileMenuOpen(false)}>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li onClick={() => setIsMobileMenuOpen(false)}>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
