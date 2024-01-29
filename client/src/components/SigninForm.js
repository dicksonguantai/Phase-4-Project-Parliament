// LoginForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login Response:', data);

      if (response.status === 201) {
        localStorage.setItem('token', data.access_token);
        navigate('/ongoing-bills');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleForgotPassword = () => {
    navigate(`/resetpassword/${email}`);
  };

  return (
    <div className="signup-box">
      <h2>Login</h2>

      <div className="form-group">
        <label>Email:</label>
        <input
          className="input-field"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          className="input-field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <button className="login-button" type="button" onClick={handleLogin}>
          Login
        </button>
      </div>

      <div className="forgot-password">
        <Link to="#" onClick={handleForgotPassword}>
          Forgot Password?
        </Link>
      </div>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginForm;

