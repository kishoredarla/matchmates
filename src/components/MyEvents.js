import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './MyEvents.css';

const MyEvents = () => {
  const { userId } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:7002/matchmates/events/user/${userId}`)
      .then(res => setEvents(res.data))
      .catch(console.error);
  }, [userId]);

  return (
    <div className="my-events">
      <h2>My Events</h2>
      <div className="cards">
        {events.map(evt => (
          <div key={evt.event_id} className="card">
            <h3>{evt.title}</h3>
            <p>{evt.description}</p>
            <p><b>When:</b> {new Date(evt.start_date).toLocaleString()} – {new Date(evt.end_date).toLocaleString()}</p>
            <p><b>Where:</b> {evt.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
