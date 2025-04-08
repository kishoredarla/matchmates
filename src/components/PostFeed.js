import React, { useState, useEffect } from 'react';
import './PostFeed.css';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:7002/matchmates/hobbies');
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = posts.filter(
      (post) =>
        post.activity.toLowerCase().includes(value) ||
        post.location.toLowerCase().includes(value)
    );
    setFilteredPosts(filtered);
  };

  const handleConnect = (activity) => {
    alert(`You've shown interest in "${activity}"! A connection request would be sent.`);
  };

  return (
    <div className="post-feed">
      <h2>Recent Hobby Posts</h2>

      <input
        type="text"
        placeholder="Search by activity or location..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {filteredPosts.length === 0 ? (
        <p>No posts available. Try changing the filter or create one!</p>
      ) : (
        <div className="post-list">
          {filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.activity}</h3>
              <p>{post.description}</p>
              <p><strong>Location:</strong> {post.location}</p>
              <p><strong>Date & Time:</strong> {new Date(post.date).toLocaleString()}</p>
              <button
                className="connect-btn"
                onClick={() => handleConnect(post.activity)}
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostFeed;
