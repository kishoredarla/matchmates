import React, { useState } from 'react'; // Removed useContext import
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/postfeed', label: 'Hobbies' },
  { path: '/about', label: 'About Us' },
  { path: '/contact', label: 'Contact' },
  { path: '/create-post', label: 'Create Post' },
];

const Navbar = () => {  // Removed props since we're using context
  const { isAuthenticated, logout } = useAuth();  // Get values from context
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();  // Use the logout function from context
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="logo">
        <NavLink to="/">
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
        {navItems.map((item) => (
          <li key={item.path} onClick={() => setIsMobileMenuOpen(false)}>
            <NavLink 
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.label}
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