import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShareActivity.css';

const ShareActivity = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    activity: '',
    location: '',
    date: '',
    description: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // ✅ Pull user_id from localStorage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setFormData(prev => ({ ...prev, user_id: storedUserId }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:7002/matchmates/hobbies/create', formData);
      if (response.status === 201) {
        setSuccess('Activity shared successfully!');
        setFormData(prev => ({
          ...prev,
          activity: '',
          location: '',
          date: '',
          description: ''
        }));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to share activity.');
    }
  };

  return (
    <div className="share-activity-container">
      <div className="form-card">
        <h2>Share Activity</h2>
        {success && <p className="success-msg">{success}</p>}
        {error && <p className="error-msg">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          {/* user_id is hidden since it's pre-filled */}
          <input type="hidden" name="user_id" value={formData.user_id} />

          <input
            type="text"
            name="activity"
            placeholder="Activity Name"
            value={formData.activity}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Short description..."
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />

          <button type="submit">Post Activity</button>
        </form>
      </div>
    </div>
  );
};

export default ShareActivity;
