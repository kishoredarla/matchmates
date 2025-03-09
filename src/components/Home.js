import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Connect with Like-Minded People</h2>
          <p>Whether you love swimming, cycling, or any other activity, find a buddy near you and join the fun!</p>
          <button>Post Your Hobby</button>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews">
        <h2>What Our Users Say</h2>
        <div className="review-cards">
          <div className="review-card">
            <p>"I found the perfect cycling partner for my weekend rides!"</p>
            <span>- John Doe</span>
          </div>
          <div className="review-card">
            <p>"Swimming with like-minded people has been so refreshing!"</p>
            <span>- Jane Smith</span>
          </div>
          <div className="review-card">
            <p>"Such a great platform to connect with people who love hiking!"</p>
            <span>- Mark Johnson</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Find a Hobby Buddy</h3>
            <p>Post your hobby and connect with people who share your interests.</p>
          </div>
          <div className="service-card">
            <h3>Join Activities</h3>
            <p>Find local events and activities to participate in with others.</p>
          </div>
          <div className="service-card">
            <h3>Create Events</h3>
            <p>Host and organize activities for your favorite hobbies and invite others to join!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
