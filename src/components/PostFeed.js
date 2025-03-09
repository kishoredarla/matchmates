import React, { useState, useEffect } from 'react';
import './PostFeed.css';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from API (mocked for now)
    const fetchedPosts = [
      {
        id: 1,
        activity: 'Cycling',
        location: 'Central Park, NY',
        date: '2025-03-12T10:00',
        description: 'Looking for a cycling buddy for a weekend ride.',
      },
      {
        id: 2,
        activity: 'Swimming',
        location: 'Beachside, CA',
        date: '2025-03-14T15:00',
        description: 'Join me for a refreshing swim at the beach.',
      },
    ];
    setPosts(fetchedPosts);
  }, []);

  return (
    <div className="post-feed">
      <h2>Recent Hobby Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available yet. Create one!</p>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.activity}</h3>
              <p>{post.description}</p>
              <p><strong>Location:</strong> {post.location}</p>
              <p><strong>Date & Time:</strong> {new Date(post.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostFeed;
