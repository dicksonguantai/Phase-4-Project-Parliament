import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [signup, setSignup] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [resetSuccessful, setResetSuccessful] = useState(false);

  const handleLogin = async () => {
    // ... (existing code for login)

    // Clear email and password fields after handling login
    setEmail(''); 
    setPassword('');
  };

  const handleSignup = async () => {
    // ... (existing code for signup)

    // Clear email and password fields after handling signup
    setEmail('');
    setPassword('');
  };

  const handleForgotPassword = () => {
    setResetPassword(true);

    // Clear email and password fields after showing reset password section
    setEmail('');
    setPassword('');
    setRetypePassword('');
    setResetSuccessful(false);
  };

  const handleResetPassword = async () => {
    try {
      // Replace with your actual reset password API endpoint
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Reset Password Response:', data);

      // Clear email and password fields after handling password reset
      setEmail('');
      setPassword('');
      setRetypePassword('');
      setResetSuccessful(true);
    } catch (error) {
      console.error('Error during password reset:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{signup ? 'Sign Up' : resetPassword ? (resetSuccessful ? 'Welcome Back' : 'Reset Password') : 'Welcome Back'}</h2>
      <div style={styles.inputContainer}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
      </div>

      {resetPassword ? (
        resetSuccessful ? (
          <>
            <p>Password successfully reset! Welcome back.</p>
            <p style={styles.toggleSignup} onClick={() => setResetPassword(false)}>
              Add existing user? Sign in
            </p>
          </>
        ) : (
          <>
            <div style={styles.inputContainer}>
              <label>New Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.inputContainer}>
              <label>Retype New Password:</label>
              <input
                type="password"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                style={styles.input}
              />
            </div>
            <button type="button" onClick={handleResetPassword} style={styles.button}>
              Reset Password
            </button>
            <p style={styles.toggleSignup} onClick={() => setResetPassword(false)}>
              Existing user? Sign in
            </p>
          </>
        )
      ) : (
        <>
          <div style={styles.inputContainer}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          {signup && (
            <div style={styles.checkboxContainer}>
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
            </div>
          )}
          {signup ? (
            <button type="button" onClick={handleSignup} style={styles.button}>
              Sign Up
            </button>
          ) : (
            <button type="button" onClick={handleLogin} style={styles.button}>
              Login
            </button>
          )}
          <p onClick={handleForgotPassword} style={styles.forgotPassword}>
            Forgot Password?
          </p>
          <p style={styles.toggleSignup} onClick={() => setSignup(!signup)}>
            {signup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </p>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
  },
  checkboxContainer: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  forgotPassword: {
    color: '#007BFF',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  toggleSignup: {
    color: '#007BFF',
    cursor: 'pointer',
  },
};

export default LoginForm;