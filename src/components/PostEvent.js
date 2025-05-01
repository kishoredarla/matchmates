import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './PostEvent.css';

const PostEvent = () => {
  const { userId } = useAuth();
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    start_date: '',
    end_date: ''
  });
  const [msg, setMsg] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = { ...form, user_id: userId };
      const res = await axios.post('http://localhost:7002/matchmates/events/create', payload);
      setMsg(res.data.message);
      setForm({ title:'',description:'',location:'',start_date:'',end_date:'' });
    } catch {
      setMsg('Failed to create event');
    }
  };

  return (
    <div className="post-event">
      <h2>Create Event</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input name="title"      value={form.title}       onChange={handleChange} placeholder="Title" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input name="location"   value={form.location}    onChange={handleChange} placeholder="Location" />
        <label>Start:</label>
        <input type="datetime-local" name="start_date" value={form.start_date} onChange={handleChange} required />
        <label>End:</label>
        <input type="datetime-local" name="end_date"   value={form.end_date}   onChange={handleChange} required />
        <button type="submit">Post Event</button>
      </form>
    </div>
  );
};

export default PostEvent;
