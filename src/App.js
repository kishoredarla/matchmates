import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import CreatePost from './components/CreatePost';  // Import CreatePost
import './App.css';
import PostFeed from './components/PostFeed';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/postfeed" element={<PostFeed />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
