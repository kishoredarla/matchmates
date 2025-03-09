import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h1>MatchMates</h1>
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/">Privacy Policy</a></li>
            <li><a href="/">Terms of Service</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <a href="/" className="social-icon">Facebook</a>
          <a href="/" className="social-icon">Twitter</a>
          <a href="/" className="social-icon">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 MatchMates. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
