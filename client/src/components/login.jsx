import React, { useState } from 'react';
import axios from 'axios';
import './login.css'
const Login = () => {
  // State to manage form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Make a POST request to the server with login credentials
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      
      // Handle successful login
      setMessage(response.data.message);
      setError('');
      setEmail('');
      setPassword('');
    } catch (err) {
      // Handle login error
      setMessage('');
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="login-form-container">
      <h2>Student Login</h2>
      
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}
      
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

