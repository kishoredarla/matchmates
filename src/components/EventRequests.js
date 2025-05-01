import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './EventRequests.css';

const EventRequests = () => {
  const { userId } = useAuth();
  const [reqs, setReqs] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:7002/matchmates/event-requests/owner/${userId}`)
      .then(res => setReqs(res.data))
      .catch(console.error);
  }, [userId]);

  const handleRespond = async (id, status) => {
    try {
      await axios.put(`http://localhost:7002/matchmates/event-requests/${id}`, { status });
      setReqs(rs => rs.map(r => r.request_id === id ? {...r, status} : r));
    } catch {
      alert('Failed to update');
    }
  };

  return (
    <div className="event-requests">
      <h2>Incoming Event Requests</h2>
      {reqs.map(r => (
        <div key={r.request_id} className="card">
          <p><b>Event:</b> {r.title}</p>
          <p><b>From:</b> {r.requester_name} (ID: {r.requester_id})</p>
          <p><b>When:</b> {new Date(r.start_date).toLocaleString()}</p>
          <p><b>Status:</b> {r.status}</p>
          {r.status === 'pending' && (
            <>
              <button onClick={() => handleRespond(r.request_id, 'accepted')}>Accept</button>
              <button onClick={() => handleRespond(r.request_id, 'declined')}>Decline</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventRequests;
