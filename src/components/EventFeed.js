import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './EventFeed.css';

const EventFeed = () => {
  const { userId } = useAuth();
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:7002/matchmates/events')
      .then(res => setEvents(res.data))
      .catch(console.error);
  }, []);

  const handleJoin = async (event) => {
    try {
      await axios.post('http://localhost:7002/matchmates/event-requests', {
        event_id: event.event_id,
        requester_id: userId
      });
      alert('Request sent');
    } catch {
      alert('Failed to send request');
    }
  };

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(filter.toLowerCase()) ||
    e.location.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="event-feed">
      <h2>Events</h2>
      <input
        placeholder="Search..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <div className="cards">
        {filtered.map(evt => (
          <div key={evt.event_id} className="card">
            <h3>{evt.title}</h3>
            <p>{evt.description}</p>
            <p><b>When:</b> {new Date(evt.start_date).toLocaleString()} – {new Date(evt.end_date).toLocaleString()}</p>
            <p><b>Where:</b> {evt.location}</p>
            <button onClick={() => handleJoin(evt)}>Join</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventFeed;
