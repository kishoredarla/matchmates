
import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setIsLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:7002/matchmates/contact-us/create',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setStatus({ type: 'success', message: res.data.message });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to send message.';
      setStatus({ type: 'error', message: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <h2>Contact Us</h2>
        <p>Have a question or feedback? Send us a message below.</p>

        {status.message && (
          <div className={`alert ${status.type}`}>{status.message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject (optional)"
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
