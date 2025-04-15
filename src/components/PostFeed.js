import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostFeed.css';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch posts from your backend API on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:7002/matchmates/hobbies');
        const data = await response.json();
        // Ensure each post includes both "id" (hobby post id) and "user_id" (owner id)
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts by activity or location based on input
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

  // When Connect is clicked, send a connection request to the activity creator
  const handleConnect = async (post) => {
    // Retrieve requester_id from localStorage (set during login)
    const requester_id = localStorage.getItem('user_id');
    // Ensure the post object includes these keys:
    const owner_id = post.user_id; // User who created the post (must exist)
    const hobby_id = post.id;      // Unique identifier for the hobby post

    console.log("Connection Request Values:", { requester_id, owner_id, hobby_id });

    if (!requester_id || !owner_id || !hobby_id) {
      alert("Missing required fields in the connection request.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:7002/matchmates/connection-request', {
        requester_id,
        owner_id,
        hobby_id,
      });
      
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Failed to send connection request.');
    }
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
                onClick={() => handleConnect(post)}
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
