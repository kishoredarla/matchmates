import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const reviews = [
  { text: "I found the perfect cycling partner for my weekend rides!", author: "John Doe" },
  { text: "Swimming with like-minded people has been so refreshing!", author: "Jane Smith" },
  { text: "Such a great platform to connect with people who love hiking!", author: "Mark Johnson" }
];

const services = [
  { title: "Find a Hobby Buddy", desc: "Post your hobby and connect with people who share your interests." },
  { title: "Join Activities", desc: "Browse local events and join others for shared fun." },
  { title: "Create Events", desc: "Host activities for your hobbies and invite others to join!" }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Connect &amp; Thrive with MatchMates</h1>
          <p>Discover local hobbyists, plan events, and build lasting friendships.</p>
          <button onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </section>

      <section className="reviews">
        <h2>What Our Users Say</h2>
        <div className="cards reviews-grid">
          {reviews.map((r, idx) => (
            <div key={idx} className="card review-card">
              <p className="review-text">“{r.text}”</p>
              <p className="review-author">— {r.author}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="services">
        <h2>Our Services</h2>
        <div className="cards services-grid">
          {services.map((s, idx) => (
            <div key={idx} className="card service-card">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
