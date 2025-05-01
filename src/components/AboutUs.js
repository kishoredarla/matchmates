// AboutUs.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <header className="about-hero">
        <h1>Welcome to MatchMates</h1>
        <p>Bringing hobbyists together for unforgettable experiences</p>
      </header>

      <section className="about-cards">
        <div className="card">
          <h2>Our Mission</h2>
          <p>
            To empower people to discover and share activities they love,
            fostering meaningful connections and vibrant communities.
          </p>
        </div>
        <div className="card">
          <h2>Our Vision</h2>
          <p>
            A world where pursuing passions is a shared journey, not a solo
            adventure—anywhere, anytime.
          </p>
        </div>
        <div className="card">
          <h2>Our Values</h2>
          <ul>
            <li>Community &amp; Inclusivity</li>
            <li>Safety &amp; Trust</li>
            <li>Fun &amp; Adventure</li>
            <li>Respect &amp; Privacy</li>
          </ul>
        </div>
      </section>

      <section className="about-lead">
        <h2>Join the Fun</h2>
        <p>
          Ready to find your next hobby buddy or host an event of your own?
          Dive in and start connecting today!
        </p>
        <button onClick={() => navigate('/login')}>Get Started</button>
      </section>
    </div>
  );
};

export default AboutUs;
