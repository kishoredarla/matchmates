import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const userId = localStorage.getItem('user_id');
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  // Fetch user profile
  useEffect(() => {
    axios.get(`http://localhost:7002/matchmates/autenticate/user/${userId}`)
      .then(res => {
        setProfile(res.data);
        setFormData(res.data);
      })
      .catch(() => setMessage('Failed to load profile.'));
  }, [userId]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:7002/matchmates/autenticate/user/${userId}`, {
      ...formData,
      updated_by: formData.user_name
    })
    .then(() => {
      setProfile(formData);
      setEditMode(false);
      setMessage('Profile updated successfully!');
    })
    .catch(() => setMessage('Failed to update profile.'));
  };

  const handleChangePassword = () => {
    if (!newPassword.trim()) return setMessage('Enter a valid password');
    axios.put(`http://localhost:7002/matchmates/autenticate/user/${userId}/change-password`, {
      newPassword
    })
    .then(() => {
      setNewPassword('');
      setMessage('Password changed successfully!');
    })
    .catch(() => setMessage('Failed to change password.'));
  };

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    axios.delete(`http://localhost:7002/matchmates/autenticate/user/${userId}`)
      .then(() => {
        setMessage('Account deleted. Logging out...');
        localStorage.clear();
        setTimeout(() => window.location.href = '/login', 1500);
      })
      .catch(() => setMessage('Failed to delete account.'));
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {message && <p className="profile-message">{message}</p>}

      <div className="profile-card">
        {editMode ? (
          <>
            {['user_name', 'first_name', 'last_name', 'email', 'mobile_no', 'address'].map(field => (
              <div key={field} className="profile-group">
                <label>{field.replace('_', ' ').toUpperCase()}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                />
              </div>
            ))}
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p><strong>Username:</strong> {profile.user_name}</p>
            <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Mobile:</strong> {profile.mobile_no}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          </>
        )}

        <hr />

        <div className="profile-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleChangePassword}>Change Password</button>
        </div>

        <hr />

        <button className="delete-btn" onClick={handleDelete}>Delete Account</button>
      </div>
    </div>
  );
};

export default Profile;
