import React, { useState } from 'react';
import './CreatePost.css';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    activity: '',
    location: '',
    date: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to create post (mocked for now)
    console.log('Post created:', formData);
    // Reset form after submission
    setFormData({
      activity: '',
      location: '',
      date: '',
      description: '',
    });
  };

  return (
    <div className="create-post">
      <h2>Create a New Hobby Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="activity">Activity</label>
          <input
            type="text"
            id="activity"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            placeholder="e.g., Cycling, Swimming"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Where are you located?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date and Time</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us more about your activity..."
            required
          />
        </div>

        <button type="submit" className="submit-btn">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
