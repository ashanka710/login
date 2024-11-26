import React, { useState } from 'react';

import axios from 'axios';
import './register.css'
// import Register from './register';
const Register = () => {
  // State to manage form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }


    try {
      const response = await axios.post('http://localhost:8000/register', {
        name,
        email,
        password,
      });
      
      setMessage(response.data.message || 'Registration successful!');
      setError('');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Error during registration:', err); // Log full error for debugging
      
      if (err.response) {
        // Backend returned an error
        setError(err.response.data.message || 'Registration failed!');
      } else if (err.request) {
        // Request was made but no response was received
        setError('No response from the server. Please try again later.');
      } else {
        // Other errors (e.g., network issues, code issues)
        setError('An error occurred. Please try again.');
      }
    
      setMessage('');
    }
  }    

  return (
    <div className="register-form-container">
      <h2>Register</h2>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
