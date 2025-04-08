import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    mobileNo: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, password, confirmPassword, mobileNo } = formData;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    if (mobileNo && !/^\+?\d{10,15}$/.test(mobileNo)) {
      setError('Please enter a valid mobile number.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:7002/matchmates/autenticate/create',
        {
          userName: formData.userName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          mobileNo: formData.mobileNo,
          address: formData.address,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        navigate('/login');
      } else {
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
  <div className="auth-card">
    <h2>Create an Account</h2>
    {error && <div className="error-message">{error}</div>}

    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name*</label>
          <input type="text" id="firstName" name="firstName" required onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name*</label>
          <input type="text" id="lastName" name="lastName" required onChange={handleChange}/>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="userName">Username*</label>
        <input type="text" id="userName" name="userName" required onChange={handleChange}/>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email*</label>
        <input type="email" id="email" name="email" required onChange={handleChange}/>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="password">Password*</label>
          <input type="password" id="password" name="password" required onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required onChange={handleChange}/>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" onChange={handleChange}/>
      </div>

      <div className="form-group">
        <label htmlFor="mobileNo">Mobile Number</label>
        <input type="tel" id="mobileNo" name="mobileNo" placeholder="+1234567890" onChange={handleChange}/>
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>

    <div className="auth-footer">
      Already have an account? <Link to="/login">Login</Link>
    </div>
  </div>
</div>

  );
};

export default Register;
