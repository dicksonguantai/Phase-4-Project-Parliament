// SignupForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignupForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is set to 'user'

  const handleSignup = async () => {
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password, role }),
      });

      const data = await response.json();
      console.log('Signup Response:', data);

      if (response.status === 201) {
        const loginResponse = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginResponse.json();
        console.log('Login Response:', loginData);

        localStorage.setItem('token', loginData.access_token);

        // Redirect based on user role
        if (role === 'mp') {
          navigate('/billform'); // Redirect to billform if the user is an MP
        } else {
          navigate('/ongoingbills'); // Redirect to ongoingbills if the user is a regular user
        }
      }

      // Reset input fields after successful signup
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="signup-box">
      <h2>Sign Up</h2>
      <div className="form-group">
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="mp">MP</option>
        </select>
      </div>

      <div className="form-group">
        <button type="button" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupForm;


