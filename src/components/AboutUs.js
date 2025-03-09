import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="intro">
        <h2>About MatchMates</h2>
        <p>Welcome to MatchMates! We're a platform designed to connect people who share common hobbies and interests. Whether you enjoy swimming, cycling, or any other activity, you'll find like-minded individuals here to join you for fun and fitness!</p>
      </section>

      <section className="mission">
        <h3>Our Mission</h3>
        <p>At MatchMates, our mission is to make it easier for people to connect and engage in activities they love. We aim to build a community where individuals can make lasting friendships and enjoy activities together, whether it's in their local area or while traveling.</p>
      </section>

      {/* <section className="team">
        <h3>Meet Our Team</h3>
        <div className="team-members">
          <div className="team-member">
            <img src="team-member1.jpg" alt="Team Member 1" />
            <h4>John Doe</h4>
            <p>Co-Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="team-member2.jpg" alt="Team Member 2" />
            <h4>Jane Smith</h4>
            <p>Co-Founder & CTO</p>
          </div>
          <div className="team-member">
            <img src="team-member3.jpg" alt="Team Member 3" />
            <h4>Mark Johnson</h4>
            <p>Marketing Head</p>
          </div>
        </div>
      </section> */}

      <section className="vision">
        <h3>Our Vision</h3>
        <p>We envision a world where everyone can pursue their passions with others who share similar interests. By fostering connections and building a strong community, we aim to encourage more active, healthy, and meaningful interactions across the globe.</p>
      </section>

      <section className="contact-us">
        <h3>Get In Touch</h3>
        <p>Have any questions or want to collaborate with us? Reach out to us anytime!</p>
        <button>Contact Us</button>
      </section>
    </div>
  );
};

export default AboutUs;
