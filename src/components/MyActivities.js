import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyActivities.css';

const MyActivities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`http://localhost:7002/matchmates/myactivities/${userId}`);
        setActivities(response.data);
      } catch (err) {
        console.error("Error fetching activities", err);
        setError("Failed to fetch your activities.");
      }
    };

    if (userId) {
      fetchActivities();
    } else {
      setError("User not authenticated.");
    }
  }, [userId]);

  return (
    <div className="my-activities">
      <h2>My Activities</h2>
      {error && <p className="error">{error}</p>}
      {activities.length === 0 ? (
        <p>You have not created any activities yet.</p>
      ) : (
        <div className="activity-list">
          {activities.map(activity => (
            <div key={activity.id} className="activity-card">
              <h3>{activity.activity}</h3>
              <p>{activity.description}</p>
              <p><strong>Location:</strong> {activity.location}</p>
              <p>
                <strong>Date & Time:</strong> {new Date(activity.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyActivities;
